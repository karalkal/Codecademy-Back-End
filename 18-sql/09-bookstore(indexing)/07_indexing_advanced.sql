CREATE index books_author_idx ON cc_user.books(author);
CREATE index books_title_idx ON cc_user.books(title);
SELECT * FROM pg_Indexes WHERE tablename = 'books';

-- without index fot > 18
EXPLAIN ANALYZE
SELECT (customer_id, quantity) FROM cc_user.orders
WHERE quantity > 18;
		-- Pl.Time: 1.5 Ex. Time: 60.6
CREATE INDEX customer_id_with_quantity_gt_18_idx 
ON cc_user.orders(customer_id, quantity)
WHERE quantity > 18;
-- with index
EXPLAIN ANALYZE
SELECT (customer_id, quantity) FROM cc_user.orders
		-- Pl.Time: 0.1 Ex. Time: 31.6
		
-- will have it as PK originally		
ALTER TABLE cc_user.customers DROP CONSTRAINT customers_pkey;
EXPLAIN ANALYZE SELECT * FROM cc_user.customers;
-- WITHOUT index/pk- PT: 0.27 ET: 7.77
ALTER TABLE cc_user.customers ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);
EXPLAIN ANALYZE SELECT * FROM cc_user.customers;
-- WITH PK- PT: 0.15 ET: 7.1

SELECT * FROM pg_Indexes WHERE tablename = 'customers';

-- IN my case there were ordered due to implemenation of auto-incerementing ID/PK
SELECT * FROM cc_user.customers LIMIT 22;
CLUSTER cc_user.customers;

EXPLAIN ANALYZE SELECT (customer_id, book_id) FROM cc_user.orders; --0.03, 31.09
CREATE index customer_id_book_id_idx ON  cc_user.orders(customer_id, book_id);
EXPLAIN ANALYZE SELECT (customer_id, book_id) FROM cc_user.orders; --similar, must be due do caching?
DROP index  cc_user.customer_id_book_id_idx;
-- PLUS quantity
EXPLAIN ANALYZE SELECT (customer_id, book_id, quantity) FROM cc_user.orders; --0.05, 33.2
CREATE index customer_id_book_id_quantity_idx ON  cc_user.orders(customer_id, book_id, quantity);
EXPLAIN ANALYZE SELECT (customer_id, book_id, quantity) FROM cc_user.orders; --similar, must be due do caching?

-- no point really in such tiny dataset
CREATE index books_author_books_title_idx ON cc_user.books(author, title);

-- large orders without index - 0.3 / 51
EXPLAIN ANALYZE 
SELECT * from CC_user.orders 
WHERE quantity * price_base > 100;

CREATE index order_totals_gt_100_idx
ON CC_user.orders(quantity, price_base)
WHERE quantity * price_base > 100;
-- large orders with index - 0.17 / 22.6
EXPLAIN ANALYZE 
SELECT * from CC_user.orders 
WHERE quantity * price_base > 100;
