-- capitalize all entries to ensure uniqueness, i.e. no nirvana and Nirvana in DB
create function capitalize_name() 
  returns trigger
as
$$
begin
  new.name = lower(new.name);
  new.name = initcap(new.name);
  return new;
end;
$$
language plpgsql;


CREATE TABLE IF NOT EXISTS band (
	id		INTEGER			GENERATED ALWAYS AS IDENTITY	PRIMARY KEY,
	name	text			NOT NULL UNIQUE,
	country text
);

CREATE TABLE IF NOT EXISTS label (
	id		INTEGER			GENERATED ALWAYS AS IDENTITY	PRIMARY KEY,
	name	text			NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS genre (
	id		INTEGER			GENERATED ALWAYS AS IDENTITY	PRIMARY KEY,
	name	text			NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS album (
	id				INTEGER			GENERATED ALWAYS AS IDENTITY	PRIMARY KEY,
	name			text			NOT NULL,
	cover			text			NOT NULL UNIQUE,
	summary			text,			
	duration		integer,	
	format			text,	
	release_year	smallint		NOT null,
	colour			text			DEFAULT 'black',
	quantity		integer			DEFAULT 0,
	price			numeric(5,2)	NOT NULL,
	band_id			integer			REFERENCES band(id),
	label_id		integer			REFERENCES label(id)
);

CREATE TRIGGER capitalize_album_trg
   before update or insert on album
   for each row
   execute procedure capitalize_name();
CREATE TRIGGER capitalize_label_trg
   before update or insert on label
   for each row
   execute procedure capitalize_name();
CREATE TRIGGER genre_trg
   before update or insert on genre
   for each row
   execute procedure capitalize_name();
CREATE TRIGGER capitalize_band_trg
   before update or insert on band
   for each row
   execute procedure capitalize_name();

--many-to-many album-genre -> cross-reference (aka join) table.
    -- foreign keys referencing the primary keys of the two member tables
    -- a composite primary key made up of the two foreign keys (PK will actually consist of the two FK)
CREATE TABLE IF NOT EXISTS album_genre(
  album_id INTEGER REFERENCES album(id),
  genre_id INTEGER REFERENCES genre(id),
  PRIMARY KEY(album_id, genre_id)
);

INSERT INTO band (name,	country)
VALUES
('aLice in Chains', 'USA'),
('SoundGARden', 'USA'),
('nirvana', 'USA'),
('KyuSS', 'USA'),
('MAYHEM', 'Norway'), 
('MonoLITHE', 'France'),
('HypocrisY', 'Sweden'),
('the Ocean', 'Germany');

INSERT INTO genre(name)
VALUES ('grunge'), ('post-metal'), ('black metal'), ('doom metal'), ('funeral doom'), ('death metal'), ('stoner rock');

INSERT INTO label(name) VALUES
('Century media RecordS'),
('napalm records'),
('ELECTRA'),
('Debemur Morti Productions');

-- must drop error INSERT INTO band (name,	country) VALUES ('nirvana', 'USA');

-- Allow NULL price
ALTER TABLE album ALTER COLUMN price DROP NOT NULL;

-- we need FKeys to be band and label names, not ids
ALTER TABLE album drop COLUMN band_id;
ALTER TABLE album drop COLUMN label_id;
ALTER TABLE album ADD COLUMN band_name text NOT NULL;
ALTER TABLE album
  ADD CONSTRAINT band_name_fk
  FOREIGN KEY (band_name)
  REFERENCES band(name);
ALTER TABLE album ALTER COLUMN band_name SET NOT NULL;
-- test - will return error
-- INSERT INTO album(name, cover, release_year) VALUES('MONOLITHE III','https://www.metal-archives.com/images/3/5/3/7/353714.jpg?5121',2012);
ALTER TABLE album ADD COLUMN label_name text NOT NULL;
ALTER TABLE album
  ADD CONSTRAINT label_name_fk
  FOREIGN KEY (label_name)
  REFERENCES label(name);


INSERT INTO album(name, cover, release_year, band_name, label_name) VALUES
('MONOLITHE III',
 'https://www.metal-archives.com/images/3/5/3/7/353714.jpg?5121',
 2012,
'Monolithe',
'Debemur Morti Productions');

-- one band cannot have 2 album entries with same name
ALTER TABLE album  ADD UNIQUE (name, band_name);
-- INSERT INTO album(name, cover, release_year, band_name, label_name) VALUES
-- ('MONOLITHE III', 'XXXX', 2012,'Monolithe','XXXX');



