 -- Some of the benefits and burdens of indexes:
    --     Increase in speed of searches/filtering
    --     Increase in storage space
    --     Increase in runtime for Insert/Update/Delete on impacted indexes.

-- compare query speed - how queries are impacted by an index
EXPLAIN ANALYZE SELECT * FROM customers where last_name = 'Jones' and first_name = 'David';

CREATE INDEX customers_last_name_first_name_idx ON customers (last_name, first_name);
EXPLAIN ANALYZE SELECT * FROM customers where last_name = 'Jones' and first_name = 'David';

-- view indexes on a table
SELECT *
FROM pg_Indexes
WHERE tablename = 'customers';

-- with indexing DB size grows
SELECT pg_size_pretty (pg_total_relation_size('customers'));

CREATE INDEX customers_last_name_idx ON customers (last_name);
SELECT pg_size_pretty (pg_total_relation_size('customers'));

-- Multicolumn indexes allow for more than one column to be used in combination as an index on a table
CREATE INDEX <index_name> ON <table_name> (<column_name1>, <column_name2>...);

-- drop an index - might be useful to do if you are modifying a large number of records on an indexed table
DROP INDEX IF EXISTS <index_name>;
   
   
-- partial index allows for indexing on a subset of a table, allowing searches to be conducted on just this group of records
CREATE INDEX users_user_name_internal_idx ON users (user_name)
WHERE email_address LIKE '%@wellsfargo.com';

-- the order of an index, you can add on the order you want your index sorted in when you create the index.
ORDER BY date_time DESC;

-- When a clustered index is created for a table, the data is physically organized in the table structure to allow for improved search times.
-- only one can be a clustered index
CLUSTER products USING products_product_name_idx;
CLUSTER products;
CLUSTER;


