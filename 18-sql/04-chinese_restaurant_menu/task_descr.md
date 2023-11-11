## Task Group 1: Create Tables and Primary Keys  

1.

The first step towards designing a database schema is to create tables with the appropriate columns and primary keys.  
Open script.sql. Create a restaurant table and an address table with columns that make sense based on the description above. Refer to our hint to see how to create these tables. Then, click SAVE to see the created table schema on the SQL browser. 

2.

In script.sql, assign a primary key to a column for each of the tables, restaurant and address. Then, write queries to validate that these primary keys exist for these tables.

3.

Next, we focus on the restaurant menu. For Bytes of China, its menu is split into many categories. Some categories (Appetizers and House Specials) simply have a name while others (Luncheon Specials) have more information such as price, hours and choice of side dishes served along with the main dish.  
In script.sql, create a category table. Check the hint for how to do this.  
A category’s id is a 2-character identifier such as ‘C’ for Chicken, ‘HS’ for House Specials and ‘LS’ for Luncheon Specials. For simplicity, the description column can contain information including hours of availability and other miscellaneous information. For most categories, only the id and name columns are sufficient and the description would be null.  
Click SAVE to see the created table schema on the SQL browser.  
Add a primary key to the correct column. Write a query to validate the primary key in this table.

4.

Next, we focus on the dishes inside a category. A dish has a name, price, description and an indicator if it’s hot and spicy.  
In script.sql, create a dish table. Check the hint to see how to create the dish table.  
Click SAVE to see the created table schema on the SQL browser.  
Add a primary key for the dish table. Write a query to validate the primary key in this table.

5.

Lastly, we create a table, review which corresponds to a customer review of the restaurant.
In script.sql, create a review table with columns that make sense. Check the hint for how to create this table.
Click SAVE to see the created table schema on the SQL browser. Add a primary key for this table. Write a query to validate the primary key in this table.

## Task Group 2: Define Relationships and Foreign Keys

6.

There are three types of database relationships: one-to-one, one-to-many and many-to-many. Of the five tables you have created, identify the relationships between any pair of tables.  
A one-to-one relationship exists when one row in a table links to exactly one row in another table and vice-versa. Which two tables in our schema perfectly address a one-to-one relationship between them?  
After identifying the two tables that exhibit a one-to-one relationship between them, implement this relationship by adding a foreign key in one of the tables. Write a query to validate the existence of this foreign key.

7.

A one-to-many relationship exists when one row in a table links to many rows in another table. Which two tables perfectly address a one-to-many relationship between them? After identifying the two tables that exhibit a one-to-many relationship between them, implement this relationship by adding a foreign key in one of the tables. Write a query to validate the existence of this foreign key.  

8.

A many-to-many relationship comprises two one-to-many relationships. Which two tables perfectly address a many-to-many relationship between them?  
How would you implement this relationship? To implement a many-to-many relationship, a third cross-reference table is required that contains two foreign keys referencing the primary keys of the member tables as well as a composite primary key from these two keys.  
If you identify the category and dish tables as having a many-to-many relationship between them, you would be correct. A menu category consists of many dishes, however, the same dish may belong to more than one category. Hence, these two tables, category and dish exhibit a many-to-many relationship between them.  
Create a third cross-reference table, categories_dishes, to implement this relationship and assign the appropriate primary and foreign keys that are needed in this table. In addition to the keys mentioned above, add a price column of type money in this table. The price column is needed in this table because the cost of a dish depends on its category. For example, Chicken with Broccoli costs $6.95 as a main dish but $8.95 if it is part of Luncheon Specials which includes side dishes.  
Click SAVE to see the created table schema on the SQL browser. Write a query to validate the primary and foreign keys that exist in this table.

## Task Group 3: Insert Sample Data

9.

Congratulations on defining the restaurant menu schema. Now, it’s time to populate the schema with our sample data.  
Open projectdata.sql. Study the various INSERT statements to populate the various tables. Copy the content from projectdata.sql and paste it to the end of script.sql and click SAVE to populate the tables.  
If you didn’t make your tables exactly as described, you might get a syntax error when copying and pasting these INSERT statements. However, this is perfectly alright. Should you get a syntax error when trying to insert data, try the following tips:
    Inspect the error message.
    Inspect the data you’re trying to insert.
    Inspect the table schema to match the data you’re inserting.

## Task Group 4: Make Sample Queries

10.

Once you have successfully imported the sample data in projectdata.sql, you can start making queries to the database. The SELECT, AS, FROM, WHERE, ORDER BY, HAVING and GROUP BY keywords will be useful here as well as a couple of functions. In script.sql. Type in a query that displays the restaurant name, its address (street number and name) and telephone number. Then, click SAVE to run the query.

11.

In script.sql, write a query to get the best rating the restaurant ever received. Display the rating as best_rating. Then, click SAVE to run the query.

12.

Open script.sql. Write a query to display a dish name, its price and category sorted by the dish name. Your results should have the following header: 
`dish_name 	price 	category`  
You should get 8 rows of results.  

13.

Instead of sorting the results by dish name, type in a new query to display the results as follows, sorted by category name.
category 	dish_name 	price

14.

Next, type a query in script.sql that displays all the spicy dishes, their prices and category. The header should look like this:
spicy_dish_name 	category 	price

You should get 3 rows of results.

15.

In a complete menu, there will be dishes that belong to more than one category. In our sample menu, only Chicken with Brocolli is assigned to two different categories - Luncheon Specials and Chicken. How do we query the database to find dishes that span multiple categories?  
We could use a database function, COUNT(column_name) to help us. For instance if we have a table whose non-primary key column appears multiple times in results, we can count how many times the row appears.  
Write a query that displays the dish_id and COUNT(dish_id) as dish_count from the categories_dishes table. When we are displaying dish_id along with an aggregate function such as COUNT(), we have to also add a GROUP BY clause which includes dish_id.

16.

Great work! Try to adjust the previous query to display only the dish(es) from the categories_dishes table which appears more than once. We can use the aggregate function, COUNT() as a condition. But instead of using the WHERE clause, we use the HAVING clause together with COUNT().

17.

Excellent! The previous two queries only give us a dish_id which is not very informative. We should write a better query which tells us exactly the name(s) of the dish that appears more than once in the categories_dishes table. Write a query that incorporates multiple tables that display the dish name as dish_name and dish count as dish_count.

18.

Our last task is an improvement on Task 11 which was to display the highest rating from the review table using an aggregate function, MAX(column_name). Since the result returned only one column, it is not very informative.  
| best_rating |————- | 5.0 |(1 row)  
It would be better if we can also see the actual review itself. Write a query that displays the best rating as best_rating and the description too. In order to do this correctly, we need to have a nested query or subquery. We would place this query in the WHERE clause.  
```SELECT column_one, column_two
FROM table_name
WHERE  column_one = ( SELECT MAX(column_one) from table_name );```

Type your last query in script.sql.

You have completed this project by writing tables, defining constraints and relationships between tables. You have populated the tables and written interesting and challenging queries to the database.

Congratulations for a project well done!
