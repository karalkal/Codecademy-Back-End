1. created DB
2. In order to import data:  
	[check HERE](https://stackoverflow.com/questions/18664074/getting-error-peer-authentication-failed-for-user-postgres-when-trying-to-ge)  
	but I changed it to trust
3. restarted  
 `sudo systemctl restart postgresql`
4. `psql -U postgres -d baseball_awards -f baseball_database.sql`
5. reset pg_hba.conf to  
`local   all             postgres                                peer`
