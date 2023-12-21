drop table if exists cart cascade;
-- link between user and album, one order might consist of many carts
CREATE TABLE IF NOT EXISTS cart(
		id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		user_id integer REFERENCES db_user(id),
		album_id integer REFERENCES album(id)
	);

drop table if exists purchase;
CREATE TABLE IF NOT EXISTS purchase(
		id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		total numeric(5, 2) DEFAULT 0,
		placed_on time,
		fulfilled_on time,
		cart_id integer REFERENCES cart(id) UNIQUE,
		user_id integer REFERENCES db_user(id)		
	);


INSERT into cart (album_id, user_id) 	values (1, 1);
-- he loves it, re-orderes it
INSERT into cart (album_id, user_id) 	values (1, 1);


SELECT cart.id,
album.id as "Album ID", album.name as "Album Name", album.band_name as "Band Name", 
album.quantity as "Quantity", album.price as "Price",
db_user.id as "User ID", db_user.email as "User email"
from cart
JOIN album ON cart.album_id = album.id
JOIN db_user on cart.user_id = db_user.id;

select * from cart;

INSERT into purchase (cart_id, user_id) values (1, 1);
INSERT into purchase (cart_id, user_id) values (2, 1);
select * from purchase;



