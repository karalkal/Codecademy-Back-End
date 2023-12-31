-- over 1 orders
SELECT COUNT(DISTINCT(customer_id))
FROM store
WHERE item_2_id IS NOT NULL;
-- over 2 orders
SELECT COUNT(DISTINCT(customer_id))
FROM store
WHERE item_3_id IS NOT NULL;

select COUNT(customer_id)  from store;				-- 100 total
select COUNT(distinct(customer_id)) from store;		-- but only 80 distinct => 20 with more than one order

-- create customer
CREATE TABLE customer AS 
SELECT distinct customer_id as id, customer_phone as phone, customer_email as email
FROM store;

ALTER TABLE customer
ADD PRIMARY KEY (id);

-- create item
CREATE TABLE item AS
SELECT DISTINCT item_1_id as id, item_1_name as name, item_1_price as price 
FROM store
UNION
SELECT DISTINCT item_2_id as id, item_2_name as name, item_2_price as price
FROM store
WHERE item_2_name IS NOT NULL
UNION
SELECT DISTINCT item_3_id as id, item_3_name as name, item_3_price as price
FROM store
WHERE item_3_name IS NOT NULL;

ALTER TABLE item
ADD PRIMARY KEY (id);

-- create intermediary table (what's the point if still many2 many?!)
CREATE TABLE orders_items AS 
SELECT item_1_id as item_id, order_id
FROM store
UNION ALL
SELECT item_2_id as item_id, order_id
FROM store
WHERE item_2_id IS NOT NULL
UNION ALL
SELECT item_3_id as item_id, order_id
FROM store
WHERE item_3_id IS NOT NULL;

select * from orders_items order by order_id;

-- create orders
CREATE TABLE "order" AS 
SELECT distinct order_id as id, order_date as date, customer_id
FROM store;

ALTER TABLE "order"
ADD PRIMARY KEY (id);

ALTER TABLE "order"
ADD FOREIGN KEY (customer_id) 
REFERENCES customer(id);

-- add FK to intermediary
ALTER TABLE orders_items
ADD FOREIGN KEY (order_id) REFERENCES "order"(id),
ADD FOREIGN KEY (item_id) REFERENCES item(id);


-- QUERIES
SELECT * FROM cc_user.store
ORDER by order_date;

SELECT DISTINCT(customer_email) FROM cc_user.store 
WHERE order_date < '2019-08-17'
ORDER by customer_email;


SELECT email
FROM cc_user.customer, cc_user.order
WHERE customer.id = cc_user.order.id
AND cc_user.order.date < '2019-08-17'
ORDER by email;


-- return the number of orders containing each unique item from STORE
-- (for example, two orders contain item 1, two orders contain item 2, four orders contain item 3, etc.)
SELECT * from cc_user.store;


WITH all_items AS
	(SELECT item_1_id as item_id, item_1_name as item_name from cc_user.store

	UNION all
	SELECT item_2_id as item_id, item_2_name as item_name from CC_user.store
	WHERE item_2_id IS NOT NULL

	UNION all
	SELECT item_3_id as item_id, item_3_name as item_name from CC_user.store
	WHERE item_3_id IS NOT NULL
				  )
SELECT COUNT(item_id) as times_appearing, item_id, item_name
FROM all_items
GROUP by item_id, item_name
ORDER by COUNT(item_id) DESC;

-- return the number of orders containing each unique item from normalized
SELECT COUNT(item_id), item_id, cc_user.item.name as item_name
FROM cc_user.order

JOIN cc_user.orders_items
ON cc_user.order.id =  cc_user.orders_items.order_id

JOIN cc_user.item
ON cc_user.orders_items.item_id = cc_user.item.id

GROUP by item_id, item.name
ORDER by COUNT(item_id) DESC;















