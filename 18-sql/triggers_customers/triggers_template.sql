INSERT INTO customers(customer_id,first_name,last_name,email_address,home_phone,city,state_name,years_old) 
OVERRIDING SYSTEM VALUE 
VALUES
    (1, 'Edward', 'Lewis', 'Edward.Lewis@example.com', '202-555-0264', 'Pittsburgh', 'Pennsylvania', 82),
    (2, 'Frances', 'Campbell', 'Frances.Campbell@example.com', '202-555-0073', 'North Las Vegas', 'Nevada', 10),
    (3, 'Dennis', 'Hall', 'Dennis.Hall@example.com', '202-555-0424', 'Chula Vista', 'California', 21)



CREATE TRIGGER insert_trigger
  BEFORE INSERT ON customers
  FOR EACH ROW
  EXECUTE PROCEDURE insert_function();

SELECT * FROM customers;

INSERT INTO customers (first_name, last_name)
VALUES ('John', 'Doe');

SELECT * FROM customers;


SELECT * FROM customers
ORDER by customer_id;

CREATE TRIGGER after_trigger
  AFTER UPDATE ON customers
  FOR EACH ROW
  EXECUTE PROCEDURE log_customers_change();

UPDATE customers
SET years_old = years_old + 10
WHERE customer_id = 1; 

SELECT * FROM customers
ORDER by customer_id;

SELECT * FROM customers_log;



-- FOR EACH ROW - trigger will fire and call the function for every row that is impacted by the related query
-- FOR EACH STATEMENT calls the function in the trigger once for each query, 

SELECT * FROM customers;

CREATE TRIGGER each_statement_trigger
  AFTER UPDATE ON customers
  FOR EACH STATEMENT
  EXECUTE PROCEDURE statement_function();

--  Let’s say someone forget to update everyone’s ages last year. 
UPDATE customers
SET years_old = years_old + 1;

SELECT * FROM customers;


--focused triggers
CREATE TRIGGER update_trigger_high
  BEFORE UPDATE ON clients
  FOR EACH ROW
  WHEN (NEW.total_spent >= 1000)
  EXECUTE PROCEDURE set_high_spender();

CREATE TRIGGER update_trigger_low
  BEFORE UPDATE ON clients
  FOR EACH ROW
  WHEN (NEW.total_spent < 1000)
  EXECUTE PROCEDURE set_low_spender();

SELECT * FROM clients ORDER BY client_id;

UPDATE clients
SET total_spent = 5000
WHERE last_name = 'Campbell';

UPDATE clients
SET total_spent = 100
WHERE last_name = 'Lewis';

SELECT * FROM clients ORDER BY client_id;


-- If a statement causes multiple triggers to fire, they are triggered in alphabetical order.

CREATE TRIGGER update_alpha
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE PROCEDURE update_first();

CREATE TRIGGER update_bravo
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE PROCEDURE update_second();

SELECT *
FROM orders
ORDER BY order_id;

UPDATE orders
SET quantity = 5
WHERE order_id = 1234;

SELECT *
FROM orders
ORDER BY order_id;

--removing triggers
SELECT * FROM information_schema.triggers;

DROP TRIGGER im_a_bad_trigger ON orders;

SELECT * FROM information_schema.triggers;

