SELECT rolname, rolsuper, rolinherit, rolcreaterole, rolcreatedb, rolcanlogin, rolreplication, rolbypassrls
FROM pg_roles;
select current_role;

CREATE ROLE abc_open_data WITH LOGIN;

-- creating a “group” role is no different than creating any other role
-- The ROLE clause causes one or more specified existing roles to be automatically added as members of the new role. This in effect makes the new role a “group”.
CREATE ROLE publishers WITH NOSUPERUSER ROLE abc_open_data;

-- you must have USAGE on a schema to use objects within it, but having USAGE on a schema is not by itself sufficient to use the objects within the schema, you must also have rights on the objects themselves
GRANT USAGE ON schema analytics TO publishers;
GRANT SELECT ON all tables IN SCHEMA analytics TO publishers;
-- check
SELECT grantor, grantee, table_schema, table_name, privilege_type
FROM information_schema.table_privileges 
WHERE grantee = 'publishers';
-- test
SET role abc_open_data;
SELECT * FROM analytics.downloads limit 10;
SET role cc_user;

-- Granting a Publisher Access to Dataset Listings
SELECT * FROM directory.datasets LIMIT 10;
GRANT USAGE ON schema directory TO publishers;
GRANT SELECT(id, create_date, hosting_path, publisher, src_size) ON directory.datasets to publishers;

-- No access to data_checksum FROM directory.datasets
SET role abc_open_data;
SELECT id, publisher, hosting_path, data_checksum FROM directory.datasets;
SELECT id, publisher, hosting_path FROM directory.datasets;
SET role cc_user;

-- Adding Row Level Security on Downloads Data
-- current_user must be the publisher of the dataset to SELECT
CREATE POLICY current_user_is_publiusher ON analytics.downloads 
FOR SELECT TO publishers
USING (analytics.downloads.owner = current_user);

ALTER TABLE analytics.downloads ENABLE ROW LEVEL SECURITY;

-- different result depending on the role
SELECT * from analytics.downloads LIMIT 10;
SET role abc_open_data;
SELECT * from analytics.downloads LIMIT 10;
