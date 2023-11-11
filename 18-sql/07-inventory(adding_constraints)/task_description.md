#### Back-End Development
#### Building an Inventory Database with PostgreSQL

In this project you’ll build out a database schema that could be used to organize an inventory of mechanical parts. This schema will keep track of all the parts, their manufacturer, category, location in storeroom, available inventory, and other relevant information.  
A database like this might be updated and queried by an inventory management application that accepts input from many users who might not be familiar with the database structure. As a result, we should make sure that there are sufficient data quality checks to ensure that only valid data can be entered into the database.  
We’ll start with tables with just a few constraints and build upon them throughout the project. Press 'Start' to begin inspecting the data.

## Improving Parts Tracking

1.  
The next few instructions will guide you through adding constraints to the parts table. Before making any changes, write a query to inspect the first 10 rows of parts.   
Take a look at the output. What data is stored in this table? This is also a good opportunity to inspect the entire schema. What other tables are available to you?

2. 
The parts table is the central table in our database, it stores all the information about the individual parts in our storeroom. Let’s make sure that we have some basic checks in place to ensure data integrity. Alter the code column so that each value inserted into this field is unique and not empty.

3.  
The parts table is missing values in the description column. Alter the table so that all rows have a value for description.

As an extra exercise, think about how you might alter the table if you wanted to fill in missing description fields with different values for each part.

4.  
To test that you’ve successfully back-filled parts, add a constraint on parts that ensures that all values in description are filled and non-empty.

5.  
Test the constraint by trying to insert a row into parts with the following information.  
Because you’ve set description to NOT NULL, PostgreSQL should reject this insert. Examine the error and change the description to a different value so that the row can be inserted.  

| id | description  | code  | manufacturer_id |
|----|--------------|-------|-----------------|
| 54 |              | V1-009| 9               |

Improving Reordering Options

6.  
In our database schema, we have a table called reorder_options. This table keeps track of the parts, quantities, and prices available from their manufacturers.
Let’s implement a check that ensures that price_usd and quantity are both NOT NULL. Can you think of some other constraints we might want to add to this table?

7.  
Let’s implement a check that ensures that price_usd and quantity are both positive. Can you think of how to enforce these rules as a single constraint and as two separate constraints?

8.  
Let’s assume our storeroom mostly tracks parts with a price per unit between 0.02 USD and 25.00 USD. Add a constraint to reorder_options that limits price per unit to within that range. Assume that price per unit for a given ordering option is the price divided by the quantity.

9.  
Add a constraint to ensure that we don’t have pricing information on parts that aren’t already tracked in our DB schema. Form a relationship between parts and reorder_options that ensures all parts in reorder_options refer to parts tracked in parts.
## Improving Location Tracking

10.  
The locations table stores information about the locations of a part for all the parts available in our storeroom. Let’s add a constraint that ensures that each value in qty is greater than 0.

11.  
Let’s ensure that locations records only one row for each combination of location and part. This should make it easier to access information about a location or part from the table. For example, our database should display:

| id | part_id | location | count |
|----|---------|----------|-------|
| 1  | 10      | 11B      | 5     |

rather than:

| id | part_id | location | count |
|----|---------|----------|-------|
| 1  | 10      | 11B      | 2     |
| 2  | 10      | 11B      | 3     |

12.  
Let’s ensure that for a part to be stored in locations, it must already be registered in parts. Write a constraint that forms the relationship between these two tables and ensures only valid parts are entered into locations.

## Improving Manufacturer Tracking

13.  
Let’s ensure that all parts in parts have a valid manufacturer. Write a constraint that forms a relationship between parts and manufacturers that ensures that all parts have a valid manufacturer.

14.  
Let’s test the most recent constraint we’ve added. Assume that 'Pip Industrial' and 'NNC Manufacturing' merge and become 'Pip-NNC Industrial'. Create a new manufacturer in manufacturers with an id=11.

15.  
Update the old manufacturers’ parts in 'parts' to reference the new company you’ve just added to 'manufacturers'.
