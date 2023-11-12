REVOKE CREATE ON SCHEMA public FROM public;
REVOKE ALL ON DATABASE whatever FROM public;

CREATE SCHEMA app_schema;
-- readonly role
CREATE ROLE  role_read_only:
GRANT CONNECT ON DATABASE whatever TO  role_read_only;
GRANT USAGE ON SCHEMA app_schema TO  role_read_only;
GRANT SELECT ON ALL TABLES IN SCHEMA app_schema TO  role_read_only;
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema GRANT SELECT ON TABLES TO  role_read_only;

-- read/write role
CREATE ROLE role_write_read:
GRANT CONNECT ON DATABASE whatever TO role_write_read;
GRANT USAGE, CREATE ON SCHEMA ON SCHEMA app_schema TO  role_write_read;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA app_schema TO  role_write_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO  role_write_read;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA app_schema to role_write_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema GRANT USAGE ON SEQUENCES TO  role_write_read;

-- user creation
CREATE user gyz1 with passowrd '123';
-- same as:
CREATE ROLE gyz2 WITH LOGIN PASSWORD '123';

GRANT role_read_only TO gyz1;
GRANT role_write_read TO gyz2;
