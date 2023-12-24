drop table if exists cart cascade;
-- link between user and album, one order might consist of many carts
-- need cart number too, not unique, related to each specific cart
CREATE TABLE IF NOT EXISTS cart(
		id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		cart_no INTEGER,
		user_id integer REFERENCES db_user(id),
		album_id integer REFERENCES album(id)
	);

INSERT into cart (cart_no, album_id, user_id) 	values (1, 1, 1);
-- he loves it, re-orderes it
INSERT into cart (cart_no, album_id, user_id) 	values (1, 1, 1);
-- and orders others
INSERT into cart (cart_no, album_id, user_id) 	values (1, 9, 1);
INSERT into cart (cart_no, album_id, user_id) 	values (1, 1, 1);


drop table if exists purchase;
CREATE TABLE IF NOT EXISTS purchase(
		id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		total numeric(5, 2) DEFAULT 0,
		placed_on time,
		fulfilled_on time,
-- 		cart_id integer REFERENCES cart(id) UNIQUE,
		user_id integer REFERENCES db_user(id)		
	);


SELECT cart.id AS "Cart ID", cart.cart_no AS "Cart No",
db_user.id as "User ID", db_user.email as "User email",
album.id as "Album ID", album.name as "Album Name", album.band_name as "Band Name", 
album.quantity as "Quantity", album.price as "Price"
FROM cart
JOIN album ON cart.album_id = album.id
JOIN db_user on cart.user_id = db_user.id;





