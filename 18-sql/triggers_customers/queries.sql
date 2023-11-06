DROP SCHEMA IF EXISTS cc_user CASCADE;
CREATE SCHEMA cc_user;
SET SEARCH_PATH = cc_user;

CREATE TABLE customers
	(
	customer_id		INTEGER			GENERATED ALWAYS AS IDENTITY	PRIMARY KEY,
	--ADD a username, MODIFY the INDEXes AS needed, UPDATE the bulk file LOAD, esnure that the username IS UNIQUE, maybe ADD a NUMBER WHEN already EXISTS.
	first_name		VARCHAR(100)	NOT NULL,
	last_name		VARCHAR(100)	NOT NULL,
	email_address	VARCHAR(300)	NULL,
	home_phone		VARCHAR(100)	NULL,
	city				VARCHAR(50)		NULL,
	state_name		VARCHAR(50)		NULL,
	years_old		INTEGER			NULL
	);
	
CREATE TABLE customers_log
	(
	changed_by	VARCHAR(100)	NOT NULL,
	time_changed	TIMESTAMP	NOT NULL,
	change_type	VARCHAR(100)	NOT NULL
	);

CREATE OR REPLACE FUNCTION override_with_min_age() RETURNS TRIGGER AS $$
	BEGIN
		NEW.years_old := 13;
		RETURN NEW;
	END;
$$ LANGUAGE PLPGSQL;

CREATE OR REPLACE FUNCTION log_customers_change() RETURNS TRIGGER AS $$
	BEGIN
		IF (TG_OP = 'UPDATE') THEN
			IF (NEW.first_name <> OLD.first_name OR NEW.last_name <> OLD.last_name) THEN
				INSERT INTO customers_log (changed_by, time_changed, change_type) VALUES (User, DATE_TRUNC('minute',NOW()), 'UPDATE');
			END IF;
		END IF;
		IF (TG_OP = 'INSERT') THEN
			INSERT INTO customers_log (changed_by, time_changed, change_type) VALUES (User, DATE_TRUNC('minute',NOW()), 'INSERT');
		END IF;
		RETURN NEW;
	END;
$$ LANGUAGE PLPGSQL;


select setval(pg_get_serial_sequence('customers', 'customer_id'), 
              (select max(customer_id) from customers) 
       ); 



INSERT INTO customers(first_name, last_name, email_address, home_phone, city, state_name, years_old)
VALUES
    ('Edward', 'Lewis', 'Edward.Lewis@example.com', '202-555-0264', 'Pittsburgh', 'Pennsylvania', 82),
    ('Frances', 'Campbell', 'Frances.Campbell@example.com', '202-555-0073', 'North Las Vegas', 'Nevada', 10),
    ('Dennis', 'Hall', 'Dennis.Hall@example.com', '202-555-0424', 'Chula Vista', 'California', 21);
    
    
    
 -- First trigger
 
SELECT *  from customers
ORDER BY customer_id;

SELECT *  from customers_log;

CREATE TRIGGER updated_customers
  AFTER UPDATE ON customers
  FOR EACH ROW
  EXECUTE PROCEDURE log_customers_change();

UPDATE customers
SET first_name  = 'KUR',
    last_name  = 'KUR'
WHERE customer_id = 1;

SELECT *  from customers_log;
SELECT *  from customers;

-- trigger only works for first_name and last_name, updating another column should log 
UPDATE customers
SET home_phone  = '0000'
WHERE customer_id = 1;

SELECT *  from customers_log;
SELECT *  from customers;



CREATE TRIGGER inserted_customer
    AFTER INSERT ON customers
    FOR EACH STATEMENT
    EXECUTE PROCEDURE log_customers_change();

INSERT INTO customers(first_name, last_name, email_address, home_phone, city, state_name, years_old)
VALUES
('A','A', 'aa@example.com', '202-555-0398', 'Sofia', 'BG', 66),
('B','B', 'bb@example.com', '202-555-0398', 'London', 'UK', 66),
('C','C', 'cc@example.com', '202-555-0398', 'Paris', 'FR', 66);

SELECT * FROM customers
ORDER BY customer_id;
SELECT * FROM customers_log;



--  trigger - when age is updated to be below 13, call function => set the age to be 13.
CREATE TRIGGER customer_min_age
    BEFORE UPDATE ON customers
    FOR EACH ROW
    WHEN (NEW.years_old < 13)
    EXECUTE PROCEDURE override_with_min_age();

UPDATE customers
SET years_old = 12
WHERE first_name = 'B';

UPDATE customers
SET years_old = 14
WHERE first_name = 'A';  

SELECT * FROM customers
ORDER BY customer_id;
SELECT * FROM customers_log;


--remove trigger
SELECT * FROM information_schema.triggers;
DROP TRIGGER customer_min_age ON customers;
SELECT * FROM information_schema.triggers;





    
    
   
