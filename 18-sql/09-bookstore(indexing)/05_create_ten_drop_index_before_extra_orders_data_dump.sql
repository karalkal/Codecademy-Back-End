SELECT * from cc_user.books LIMIT 22;

-- check time and size - planning 0.066, exec 0.035, size 56kB
EXPLAIN ANALYZE SELECT(original_language, title, sales_in_millions) from cc_user.books
WHERE original_language = 'French';
SELECT pg_size_pretty (pg_total_relation_size('cc_user.books'));

-- create index
CREATE INDEX books_original_language_idx ON cc_user.books(original_language);

-- check again - - planning 0.150, exec 0.033, size 72kB
EXPLAIN ANALYZE SELECT(original_language, title, sales_in_millions) from cc_user.books
WHERE original_language = 'French';
SELECT pg_size_pretty (pg_total_relation_size('cc_user.books'));

-- Delete the multicolumn index we created above to make it so inserts into the books will run quickly.
SELECT *
FROM pg_indexes
WHERE tablename = 'books';
DROP index cc_user.books_original_language_idx;