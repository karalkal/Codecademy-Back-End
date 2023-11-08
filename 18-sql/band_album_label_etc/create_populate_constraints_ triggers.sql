-- Creating all of the tables
-- (the key here is to use a SERIAL or BIGSERIAL data type, which creates a sequence behind the scenes and increments/uses it at insert time) 

DROP table IF EXISTS band CASCADE;
CREATE TABLE band (
-- 	bandId SERIAL PRIMARY KEY,  -- messing up with intermediary table, f*** this
-- 	name varchar(44) UNIQUE,
	name varchar(44) PRIMARY KEY,
	country varchar(44) DEFAULT NULL,
	active boolean DEFAULT NULL
);

DROP table IF EXISTS album;
CREATE TABLE album (
	name text PRIMARY KEY,
	year text,
	band_name varchar(44) REFERENCES band(name)
);

DROP table IF EXISTS style;
CREATE TABLE style (
	name text PRIMARY KEY,
	band_name varchar(44) REFERENCES band(name)
);

INSERT INTO band (name,	country, active)
VALUES
('Alice in Chains', 'USA', true),
('Soundgarden', 'USA', false),
('Nirvana', 'USA', false),
('Pearl Jam', 'USA', true),
('Stone Temple Pilots', 'USA', false),
('The Smashing Pumpkins', 'USA', false),
('Temple of the Dog', 'USA', false),
('Mother Love Bone', 'USA', false),
('Mad Season', 'USA', false),
('Mudhoney', 'USA', true),
('Afghan Whigs', 'USA', true),
('Sonic Youth', 'USA', false),
('Screaming Trees', 'USA', false),
('Melvins', 'USA', true),
('L7', 'USA', false),
('Hole', 'USA', false),
('Mark Lanegan Band', 'USA', false),
('Red Fang', 'USA', true),
('Kyuss', 'USA', false)
;

SELECT * FROM band;

ALTER TABLE album 
ALTER COLUMN year 
	TYPE integer
	USING year::integer;
-- won't work without last line

ALTER TABLE album 
	ADD CONSTRAINT year CHECK 
	(year > 1900 
	AND 
	year <= 2023)
	;	
-- want to make max year to be current dynamic	
ALTER TABLE album 
	DROP CONSTRAINT IF EXISTS year;	

-- better to do it with a trigger but for simplicity -> dummy column
ALTER TABLE album 
ADD current_year integer DEFAULT date_part('year', now()); 

ALTER TABLE album 
	ADD CONSTRAINT album_year_not_in_future 
	CHECK (year <= current_year);

ALTER TABLE album 
	ADD CONSTRAINT album_year_not_too_low
	CHECK (year > 1900);
	
SELECT date_part('year', now());

INSERT INTO album
VALUES
	('Facelift', 1990, 'Alice in Chains'),
	('Dirt', 1992, 'Alice in Chains'),
	('Alice in Chains', 1995, 'Alice in Chains'),
	('Black Gives Way to Blue', 2009, 'Alice in Chains'),
	('The Devil Put Dinosaurs Here', 2013, 'Alice in Chains'),
	('Rainier Fog', 2018, 'Alice in Chains');


INSERT INTO album VALUES
	('INVALID', 1900, 'Alice in Chains');

INSERT INTO album VALUES
	('INVALID', 2024, 'Alice in Chains');

INSERT INTO album VALUES
	('INVALID', 2022, 'NO BAND');
	
INSERT INTO album
VALUES ('Bleach', 1989, 'Nirvana'),
('Nevermind', 1991, 'Nirvana'),
('In Utero', 1993, 'Nirvana');

INSERT INTO album
VALUES ('Ultramega OK', 1988, 'Soundgarden'),
('Louder Than Love', 1989, 'Soundgarden'),
('Badmotorfinger', 1991, 'Soundgarden'),
('Superunknown', 1994, 'Soundgarden'),
('Down on the Upside', 1996, 'Soundgarden'),
('King Animal', 2012, 'Soundgarden');

INSERT INTO album
VALUES ('Ten' , 1991, 'Pearl Jam'),
('Vs.' , 1993, 'Pearl Jam'),
('Vitalogy' , 1994, 'Pearl Jam'),
('No Code' , 1996, 'Pearl Jam'),
('Yield' , 1998, 'Pearl Jam'),
('Binaural' , 2000, 'Pearl Jam'),
('Riot Act' , 2002, 'Pearl Jam'),
('Pearl Jam' , 2006, 'Pearl Jam'),
('Backspacer' , 2009, 'Pearl Jam'),
('Lightning Bolt' , 2013, 'Pearl Jam'),
('Gigaton' , 2020, 'Pearl Jam');

DELETE from band 
WHERE band.name 
IN ('Mother Love Bone',
  	'Mad Season',
  	'Mudhoney',
  	'Melvins', 
  	'Mark Lanegan Band',
	'L7', 
	'Hole',
  	'Red Fang'
);

SELECT * from band;

INSERT INTO band (name,	country, active)
VALUES
('Ataraxie', 'France', true),
('Monolithe', 'France', true);

INSERT INTO album
VALUES ('Slow Transcending Agony', 2005, 'Ataraxie'),
('Anhédonie', 2008, 'Ataraxie'),
('L''être et la nausée', 2013, 'Ataraxie'),
('Résignés', 2019, 'Ataraxie');

INSERT INTO album
VALUES  ('Monolithe I', 2003, 'Monolithe'),
    ('Monolithe II', 2005, 'Monolithe'),
    ('Monolithe III', 2012, 'Monolithe'),
    ('Monolithe IV', 2013, 'Monolithe'),
    ('Zeta Reticuli', 2016, 'Monolithe'),
    ('Nebula Septem', 2018, 'Monolithe'),
    ('Okta Khora', 2019, 'Monolithe'),
    ('Kosmodrom', 2022, 'Monolithe');
	
SELECT * from album WHERE band_name = 'Monolithe';

-- actually band to style is many2many
DROP table style;

CREATE table style (
	name varchar(22) PRIMARY KEY, 
	description text);
	
INSERT INTO style VALUES
    ('grunge',  'grunge description'), 
    ('alternative metal', 'alternative metal description'), 
    ('sludge metal', 'sludge metal description'), 
    ('funeral doom', 'funeral doom description'), 
    ('death metal', 'death metal description'), 
    ('punk', 'punk description');
	
CREATE TABLE band_style(
  band_name varchar(44) REFERENCES band(name),
  style_name varchar(22) REFERENCES style(name),
  PRIMARY KEY (band_name, style_name)
);

-- add styles counter reflecting inserts in the intermediary table
ALTER TABLE band
  ADD COLUMN styles_linked integer DEFAULT 0;
 SELECT * from band;
 
-- Increment styles count
CREATE OR REPLACE FUNCTION increment_style_count()
  RETURNS trigger AS
$BODY$
BEGIN
	UPDATE band
	SET styles_linked = styles_linked + 1
	WHERE band.name = NEW.band_name;
	RETURN NEW;
END;
$BODY$
LANGUAGE plpgsql;
 
CREATE OR REPLACE TRIGGER increment_band_styles
    AFTER INSERT ON band_style
    FOR EACH ROW
    EXECUTE FUNCTION increment_style_count();
	
INSERT INTO band_style VALUES ('Nirvana', 'punk');

select * from band_style;

SELECT band.styles_linked  FROM band
WHERE band.name = 'Nirvana';

select * from band_style WHERE band_name = 'Nirvana';

-- adding table gig and additional constraints
INSERT INTO band(name) VALUES ('Wooden Shjips');
select * from band;

-- ERRORS as we already have null
ALTER TABLE band
ALTER country SET NOT NULL;

UPDATE band
SET country = 'not_provided'
WHERE country IS NULL;

ALTER TABLE band
ALTER country SET NOT NULL;
select * from band;

--specifying the columns that need to be jointly unique - only one album per year per band (stupid example of course)
select * from album;

ALTER TABLE album
ADD UNIQUE(year, band_name);
-- UNIQUE (session_timeslot, attendee_id)

INSERT INTO album VALUES ('Same year as Facelift', 1990, 'Alice in Chains');--ERROR







