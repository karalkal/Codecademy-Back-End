SELECT column_name,	data_type
FROM information_schema.columns
WHERE table_name = 'album';

DROP table if exists db_user;
drop function if exists replace_empty_str_with_null;

CREATE TABLE IF NOT EXISTS db_user (
	id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	f_name text NOT NULL,
	l_name text NOT NULL,
	email text NOT NULL,
	password_hash text NOT NULL,
	house_number integer,
	street_name text,
	city text,
	country text,
	is_admin boolean DEFAULT FALSE,
	is_contributor boolean DEFAULT FALSE,
	CONSTRAINT email_unique UNIQUE (email),
	CONSTRAINT address_unique UNIQUE (house_number, street_name, city, country)
);

/*
 {	"f_name": "kkkk",	"l_name": "kkkk",	"email": "k@k.k",
 "password": "kkkk",	"house_number": "",	"street_name": "",
 "city": "",	"country": "",	"is_admin": "",	"is_contributor": ""
 }
 */
-- replace "" values with NULL
CREATE function replace_empty_str_with_null() 
RETURNS trigger as 
$$ begin 
	new.house_number = NULLIF(old.house_number, 0);
	new.street_name = NULLIF(old.street_name, '');
	new.city = NULLIF(old.city, '');
	new.country = NULLIF(old.country, '');
return new;
end;
$$ language plpgsql;

CREATE TRIGGER null_instead_of_empty_str before
UPDATE
	or
INSERT
	ON db_user for each row execute procedure replace_empty_str_with_null();