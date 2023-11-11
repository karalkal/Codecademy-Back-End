SELECT * from parts LIMIT 10;

ALTER table parts 
ALTER code SET NOT NULL;

SELECT * from parts WHERE description IS NULL;
UPDATE parts
SET description = 'not_provided'
WHERE description IS NULL;

SELECT * from parts WHERE description = 'not_provided';

-- no constraint yet
INSERT INTO parts (id, description, code, manufacturer_id)
VALUES (54, NULL, 'V1-009', 9);
-- allowing NULL value
SELECT * from parts WHERE description IS NULL;
-- DELETE it
DELETE from parts
WHERE description IS NULL;
-- implement NOT NULL
ALTER table parts 
ALTER description SET NOT NULL;
--test again - not allowing NULL
INSERT INTO parts (id, description, code, manufacturer_id)
VALUES (54, NULL, 'V1-009', 9);
INSERT INTO parts (id, description, code, manufacturer_id)
VALUES (54, 'good description', 'V1-009', 9);

-- reorder_options
SELECT * from reorder_options; 
-- not null price, quantity
ALTER table reorder_options
ALTER price_usd SET NOT NULL;
ALTER table reorder_options
ALTER quantity SET NOT NULL;
-- disallow negative price, quantity
UPDATE reorder_options
SET	quantity = -88,
	price_usd = -22.22
WHERE id = 1;
SELECT * from reorder_options WHERE id = 1;
-- Error as we just created negative
ALTER TABLE reorder_options
	ADD CONSTRAINT price_usd
	CHECK (price_usd > 0);
	
DELETE from reorder_options WHERE price_usd < 0;

ALTER TABLE reorder_options
	ADD CONSTRAINT price_usd
	CHECK (price_usd > 0.02 AND price_usd/quantity < 25);	
ALTER TABLE reorder_options
	ADD CONSTRAINT quantity
	CHECK (quantity > 0);
-- test with update
UPDATE reorder_options
SET	quantity = -88,
	price_usd = 22.22
WHERE id = 2;
-- test with insert
INSERT INTO reorder_options VALUES (1111, 1, 0.01999, 1);
INSERT INTO reorder_options VALUES (1111, 1, -22.22, 88);	--too cheap
INSERT INTO reorder_options VALUES (1112, 1, 250, 10); 		--too expensive per unit
--valid
INSERT INTO reorder_options VALUES (1, 1, 22.22, 88);

--add FK constraint
ALTER TABLE parts ADD PRIMARY KEY (id);

ALTER TABLE reorder_options
	ADD CONSTRAINT part_id
	FOREIGN KEY (part_id)
	REFERENCES parts(id);
	
-- 	Improving Location Tracking
SELECT * FROM locations WHERE part_id IN
  (SELECT part_id FROM locations GROUP BY part_id HAVING COUNT(*) > 1)
  ORDER by part_id;
  
ALTER TABLE locations
	ADD CONSTRAINT qty
	CHECK (qty > 0);	
-- part_id and location should be unique within the locations table	
ALTER TABLE locations
ADD UNIQUE (part_id, location);

-- Improving Manufacturer Tracking
select * from manufacturers;
ALTER TABLE parts
	ADD CONSTRAINT manufacturer_id
	FOREIGN KEY (manufacturer_id)
	REFERENCES manufacturers(id);
	
INSERT INTO manufacturers VALUES (11, 'Pip-NNC Industrial');
SELECT  *  from parts where manufacturer_id = 1 or manufacturer_id = 2

UPDATE parts
SET manufacturer_id = 11
WHERE manufacturer_id = 1 or manufacturer_id = 2;
