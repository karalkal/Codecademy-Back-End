-- foreign key - parent table will house a primary key and the child table will house both primary and foreign keys
CREATE TABLE book (
  title varchar(100),
  isbn varchar(50) PRIMARY KEY,
  pages integer,
  price money,
  description varchar(256),
  publisher varchar(100)
);

CREATE TABLE chapter (
  id integer PRIMARY KEY,
  book_isbn varchar(50) REFERENCES book(isbn),
  number integer,
  title varchar(50),
  content varchar(1024)
);


SELECT 
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'chapter';

SELECT * FROM book;
SELECT * FROM chapter;
SELECT book.title as book, chapter.title as chapters 
FROM book
JOIN chapter
ON book.isbn = chapter.book_isbn;


-- composite key
CREATE TABLE voting (
  QuestionID NUMERIC,
  MemberID NUMERIC,
  PRIMARY KEY (QuestionID, MemberID)
);

--To enforce a strictly one-to-one relationship in PostgreSQL, we need another keyword, UNIQUE. _id char(20) REFERENCES driver(license_id) UNIQUE
CREATE TABLE book_details (
  id integer PRIMARY KEY,
  book_isbn varchar(50) REFERENCES book(isbn) UNIQUE,
  rating decimal,
  language varchar(10),
  keywords text[],
  date_published date
);

-- Since the book_isbn column has two constraints (foreign key and unique), it therefore appears twice in the query result
SELECT 
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'book_details';

-- To drop a column from an existing table, use this syntax:
ALTER TABLE table_name 
DROP COLUMN column_name;

--To implement a many-to-many relationship we would create a third cross-reference table also known as a join table. It will have these two constraints:
    -- foreign keys referencing the primary keys of the two member tables
    -- a composite primary key made up of the two foreign keys
--The primary key will actually consist of the two foreign keys


CREATE TABLE books_authors(
  book_isbn varchar(50) REFERENCES book(isbn),
  author_email varchar(20) REFERENCES author(email),
  PRIMARY KEY(book_isbn, author_email)
);










