for some reason postgres starts on PORT 5433  
If `FATAL: password authentication failed for user "postgres" ...`  

[follow the instructions here](https://stackoverflow.com/questions/55038942/fatal-password-authentication-failed-for-user-postgres-postgresql-11-with-pg)  
`sudo nano ./etc/postgresql/16/main/pg_hba.conf`   
set "127.0.0.1/32" to "trust"  
connect with pgadmin  
then don't forget to reset original value  