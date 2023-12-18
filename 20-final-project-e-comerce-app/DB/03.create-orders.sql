CREATE TABLE IF NOT EXISTS purchase(
		id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		total numeric(5, 2) DEFAULT 0,
		placed_on time,
		fulfilled_on time,
		user_id integer REFERENCES db_user(id)
	);
