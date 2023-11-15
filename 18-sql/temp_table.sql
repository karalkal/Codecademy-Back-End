CREATE TEMP TABLE myTemp(first_name VARCHAR(100), last_name VARCHAR(100), book_id INTEGER);

INSERT INTO myTemp (first_name, last_name, book_id)
SELECT
    c.first_name,
    c.last_name,
    o.book_id
FROM customers    AS c
INNER JOIN orders    AS o    ON o.customer_id = c.customer_id
WHERE c.state_name = 'Texas';

SELECT
    m.first_name,
    m.last_name,
    b.title,
    b.original_language
FROM myTemp    AS m
INNER JOIN books    AS b    ON b.book_id = m.book_id
    AND b.original_language = 'Czech';
    
SELECT
    m.first_name,
    m.last_name,
    b.title,
    b.original_language
FROM myTemp    AS m
INNER JOIN books    AS b    ON b.book_id = m.book_id
    AND b.first_published  < 1990;

        
DROP TABLE myTemp;
