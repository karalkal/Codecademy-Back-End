
  --  pg_total_relation_size will return the size of the table and all its indexes in bytes. These values are often in the millions or billions and thus hard to read.
  --  pg_table_size and pg_indexes_size return the size of the table’s data and table’s indexes in bytes. The sum of these two functions is equal to pg_total_relation_size
  --  pg_size_pretty can be used with the functions above to format a number in bytes as KB, MB, or GB.
SELECT pg_size_pretty(pg_total_relation_size('mock.stock_prices')) as total_size;

-- space that we marked safe for overwriting with VACUUM

-- DEMO UPDATE size grows due to dead tuples
SELECT pg_size_pretty(pg_total_relation_size('mock.stock_prices')) as total_size;
-- Size is 128kB

-- update all prices after 1 Jan 2020
UPDATE mock.stock_prices 
SET price_sh = price_sh - 10 
WHERE trading_date > '2020-01-01' ;
SELECT pg_size_pretty(pg_total_relation_size('mock.stock_prices')) as total_size;
-- Size is 152kB

VACUUM mock.stock_prices;
SELECT pg_size_pretty(pg_total_relation_size('mock.stock_prices')) as total_size;
-- Size is 160kB

--  When autovacuum is enabled and finds such a table, a VACUUM ANALYZE command is run. This statement is a combination of two separate operations.
--     VACUUM, which manages the dead tuples in a database table
--     ANALYZE, which is a statement that allows PostgreSQL to look at a table and gather information about contents. PostgreSQL then stores this data internally and uses it to ensure that queries are planned in the most efficient way given the structure of the table.
SELECT schemaname,
    relname, 
    last_vacuum,
    last_autovacuum, 
    last_analyze
FROM pg_stat_all_tables 
WHERE relname = 'orders';

-- VACUUM ANALYZE <table name>; or just ANALYZE <table name>
ANALYZE mock.orders;
SELECT schemaname,
    relname, 
    last_vacuum,
    last_autovacuum, 
    last_analyze
FROM pg_stat_all_tables 
WHERE relname = 'orders';


-- VACUUM FULL rewrites all the data from a table into a “new” location on disk and only copies the required data (excluding dead tuples). This allows PostgreSQL to fully clear the space the table occupied. 
-- blocks other operations on the table while it’s working
SELECT pg_size_pretty(
    pg_total_relation_size('mock.orders')
) as total_size;

select relname, n_live_tup, n_dead_tup , last_vacuum
from pg_catalog.pg_stat_all_tables
where relname = 'orders';
-- 50/50 live dead
VACUUM FULL mock.orders;
SELECT pg_size_pretty(
    pg_total_relation_size('mock.orders')
) as total_size;



--  remove all the rows, but retain the structure of a table - TRUNCATE
-- substitute for an unqualified DELETE, i.e. WHERE 1 = 1
SELECT pg_size_pretty(
    pg_total_relation_size('mock.current_day_logins')
) as total_size;
TRUNCATE mock.current_day_logins;

SELECT pg_size_pretty(pg_total_relation_size('mock.current_day_logins')) as total_size;



