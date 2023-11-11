#### Back-End Development
## Data Exchange Service

This project will involve implementing a PostgreSQL database that’s suitable for storing data for a data sharing application. Imagine that your company has created a data platform that allows users to share datasets and the metadata (e.g. number of downloads, number of views, path to raw file).  
A few select data publishers have been given access to your database and you’ve been tasked with setting up the permissions that allow these publishers to get relevant information about how users are interacting with the data they’ve uploaded.  
## Tasks
1.
Right now, the database has just one superuser. Write a query that allows you to determine the name of that role.  

2.
What are the names of the other users in the database? What permissions do these roles have (e.g. rolcreaterole, rolcanlogin, rolcreatedb, etc.)?  

3.
Now that you have the name of the superuser, check the name of the role you’re currently using. Is this role the superuser?

### Adding a Publisher
4.
In this section we’ll add a role for our first publisher, “ABC Open Data, Inc.”  
First, let’s create a login role named abc_open_data without superuser permissions.  

5.
Now let’s create a non-superuser group role named publishers and include abc_open_data as a member.  
We can add multiple publishers to this group role and then manage their permissions by modifying this role.  

### Granting a Publisher Access to Analytics
6.
There’s a schema in the database named analytics. All publishers should have access to this schema. Grant USAGE on this schema to publishers  

7.
Now that publishers has USAGE, write the query that grants publishers the ability to SELECT on all existing tables in analytics.  

8.
Check to see how PostgreSQL has recorded the changes to the schema permissions you just updated.  
Query the information schema table table_privileges to check whether abc_open_data has SELECT on analytics.downloads.  
Do you think abc_open_data or publishers will appear in this table?

9.
Let’s confirm that abc_open_data has the ability to SELECT on analytics.downloads through inheritance from publishers.  
This is important because we’ll want to manage most publishers’ permissions through the group role publishers instead of the role for each publisher.  
SET your role to abc_open_data and try the query below:  
SELECT * FROM analytics.downloads limit 10;  
Remember to SET your role back to ccuser before moving on to the subsequent steps.

### Granting a Publisher Access to Dataset Listings
10.
There is a table named directory.datasets in the database with the following schema. SELECT from this table to see a few sample rows.
```
    Table "directory.datasets"
+---------------+------+-----------+
|    Column     | Type | Nullable  |
+---------------+------+-----------+
| id            | text | not null  |
| create_date   | date |           |
| hosting_path  | text |           |
| publisher     | text |           |
| src_size      | text |           |
| data_checksum | text |           |
+---------------+------+-----------+
```
Indexes:
    "datasets_pkey" PRIMARY KEY, btree (id)  

11.
Grant USAGE on directory to publishers. This statement should be almost identical to the way that we granted USAGE on analytics.  

12.
Let’s write a statement to GRANT SELECT on all columns in this table (except data_checksum) to publishers.

13.
Let’s mimic what might happen if a publisher tries to query the dataset directory for all dataset names and paths.  
SET the role of your current session to abc_open_data and try the query below.  
SELECT id, publisher, hosting_path, data_checksum 
FROM directory.datasets  
Why is this query failing? Can you remove a column from this query so that it’s successful?  
Remember to SET your role back to ccuser after this section.  
Adding Row Level Security on Downloads Data  

14.
Although we’re designing a collaborative data environment, we may want to implement some degree of privacy between publishers.  
Let’s implement row level security on analytics.downloads. Create and enable policy that says that the current_user must be the publisher of the dataset to SELECT.

15.
Write a query to SELECT the first few rows of this table. Now SET your role to abc_open_data and re-run the same query, are the results the same?
