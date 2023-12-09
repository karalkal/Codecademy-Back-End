SELECT
    column_name,
    data_type
FROM
    information_schema.columns
WHERE
    table_name = 'album';
	
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

-- capitalize all entries to ensure uniqueness, i.e. no nirvana and Nirvana in DB
create function lowercase_str() 
  returns trigger
as
$$
begin
  new.name = lower(new.name);
  return new;
end;
$$
language plpgsql;


CREATE TRIGGER lowercase_str before
UPDATE
  or
INSERT
  ON db_user for each row
  execute procedure capitalize_name();