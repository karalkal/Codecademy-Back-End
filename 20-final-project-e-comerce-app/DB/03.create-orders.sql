DROP table if exists purchase;

drop function if exists replace_total_null_with_zero;

CREATE TABLE IF NOT EXISTS purchase(
		id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		total numeric(5, 2) DEFAULT 0,
		placed_on time,
		fulfilled_on time,
		user_id integer REFERENCES db_user(id)
	);
-- replace NULL values with 0
CREATE function replace_total_null_with_zero() 
RETURNS trigger 
as 
$$ begin 
	if total = NULL then
		return 0;
	end if;
end;
$$ language plpgsql;

CREATE TRIGGER ZERO_instead_of_NULL before
UPDATE
	or
INSERT
	ON purchase for each row execute procedure replace_total_null_with_zero();

