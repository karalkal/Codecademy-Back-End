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

CREATE TABLE IF NOT EXISTS genre (
	id		INTEGER			GENERATED ALWAYS AS IDENTITY	PRIMARY KEY,
	name	text			NOT NULL UNIQUE
);

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
('Alice in Chains', 'USA'),
('Soundgarden', 'USA'),
('Nirvana', 'USA'),
('Kyuss', 'USA'),
('Mayhem', 'Norway'), 
('Monolithe', 'France'),
('Hypocrisy', 'Sweden'),
('The Ocean', 'Germany');

INSERT INTO genre(name)
VALUES ('grunge'), ('post-metal'), ('black metal'), ('doom metal'), ('funeral doom'), ('death metal'), ('stoner rock');



