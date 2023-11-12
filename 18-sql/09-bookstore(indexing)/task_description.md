#### Back-End Development
# Book Store Indexes

We are running an online bookstore and need to keep track of what books we offer. We’ll be working with a database of three tables. The books table is created from the top selling books of all time. The customers and orders tables are randomly generated.  
As a note, this project will most likely run slower for you than most other projects in Codecademy. In order to see the benefits of an index, you need a large database. We tried to make the database as small as possible but still large enough to get a benefit of creating good indexes.  
If you have trouble viewing information on any of the panels remember you can adjust the size of any of the windows by dragging on their edges.  

## Tasks
#### Existing Structure

1.
Before we start having fun with the database, familiarize yourself with what we are starting with, look at the first 10 rows in each table; customers, orders, and books to get a feel for what is in each.  

2.
Before you make any changes to a database and its tables, you should know what you are working with. Examine the indexes that already exist on the three tables customers, books, and orders. Can you think of any right now that might be useful to add (check the hints for some of our ideas)?

#### Create Indexes
3.
While looking over the history of the queries you have been running for the marketing and shipping departments over the last month, you notice that you are looking at the foreign keys in the orders table — customer_id and book_id — often enough that you think it might be a good idea to build an index on each of these columns. You do note that although they do sometimes ask for information on who placed an order and the specific book they ordered, most of the time they ask for only one of these at a time. Add the index(es) to help speed this process? Can you think of any dangers of this?

#### Is a Multicolumn Index good here?
4. 
We are about to create a multicolumn index, but before we do let’s get some information prepared to make sure we are ready to analyze if it was a good or bad index to create.

Use EXPLAIN ANALYZE to check the runtime of a query searching for the original_language, title, and sales_in_millions from the books table that have an original_language of 'French'.  

5.
Remember, runtime isn’t the only impact that indexes have, they also impact the size of your table, so let’s get the size of the books table using

`SELECT pg_size_pretty (pg_total_relation_size('<table_name>'));`

6.

Now let’s take a look at the situation you were preparing for. Your translation team needs a list of the language they are written in, book titles, and the number of copies sold to see if it is worth the time and money in translating these books. Create an index to help speed up searching for this information.  

7.
Now that you have your index let’s repeat our process in tasks 1 and 2 and compare the runtime and size with our index in place. To make a true assessment you would also have to look at other impacts of an index such as the impact on INSERT, UPDATE, and DELETE statements on the table. With just the size and runtime of this query, do you think this is a useful index?

#### Clean up

8.
After running your site for a while, you find that you’re often inserting new books into your books table as new books get released. However, many of these books don’t sell enough copies to be worth translating, so your index has proven to be more costly than beneficial. Delete the multicolumn index we created above to make it so inserts into the books will run quickly.

#### Bulk insert

9.
The company you work for has bought out a competitor bookstore. You will need to load all of their orders into your orders table with a bulk copy. Let’s see how long this bulk insert will take. Since the syntax on how to do this was not part of the lesson, here is the script that will take the data in the file orders_add.txt and insert the records into the orders table.

SELECT NOW();

\COPY orders FROM 'orders_add.txt' DELIMITER ',' CSV HEADER;

SELECT NOW();

EXPLAIN ANALYZE doesn’t work on the COPY call, so we are using a timestamp before and after we load the information into the database. Make a note of the time difference between the two timestamps as they will get erased in the next task.

10.
Now go back to your copy function and before you get the first timestamp, drop all of the indexes you have created so far on the orders table in this project. Then, after the second timestamp, recreate them. Look at the time to do the bulk load now. Why is it faster?  
As a note, the Codecademy website clears and rebuilds the database you are working with every time you hit the save button. If you were to run this code on another database server you would hit duplicate insert errors since you would have already inserted the books from orders_add.txt once.  
If you are interested, you can also put time stamps around the DROP and CREATE of the indexes to see how long these take to run as well.

### Do you know what to do?
11.
Your boss tells you that you need to build an index on the customers table with first_name and email_address. Your boss says people keep asking for contact information for clients. Before jumping in and creating the index, try to answer some of these questions:

    Is this a good idea?
    What would you need to check to see if this would help the system?
    What questions would you have to ensure it is a good use of an index?
    What suggestions might you make?
    What negative aspects of creating it should you bring up?

Create this index (or a better one you can think of) and perform your own tests on it.  
Once you have considered these questions check the hint for some of our thoughts on how to answer these questions.