-- Chinese Thingie


CREATE table restaurant (
	id integer PRIMARY KEY,
	name varchar(22),
	slogan varchar(22),
	review_score real,
	phone integer,
	opening_hours varchar(88)
);

CREATE table address (
	id integer PRIMARY KEY,
	addr_number integer,
	addr_street varchar(22),
	addr_city varchar(22),
	addr_state varchar(22),
	location varchar(88),
	restaurant_id integer REFERENCES restaurant(id) UNIQUE
);

SELECT 
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'restaurant';
  
SELECT 
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'address';


CREATE table category(
    id char(2) PRIMARY KEY,
    name varchar(20),
    description varchar(200)
);


CREATE table dish (
    id integer PRIMARY KEY,
    name varchar(50),
    description varchar(200),
    hot_and_spicy boolean
);

CREATE table review (
    id integer PRIMARY KEY,
    rating decimal,
    description varchar(100),
    date date
);

-- according to the description:
-- A menu category consists of many dishes, however, the same dish may belong to more than one category - many-to-many relationship between them.

CREATE table categories_dishes(
	category_id char(2) REFERENCES category(id),
    dish_id integer REFERENCES dish(id),
    PRIMARY KEY(category_id, dish_id),	
	price money
	);

SELECT 
  constraint_name, table_name, column_name
FROM
  information_schema.key_column_usage
WHERE
  table_name = 'categories_dishes';



-- small amendments and insert
-- phone was supposed to be char, others too long
ALTER TABLE restaurant ALTER COLUMN phone TYPE varchar (44);
ALTER TABLE restaurant ALTER COLUMN name TYPE varchar (44);
ALTER TABLE restaurant ALTER COLUMN slogan TYPE varchar (44);

-- extra colimn in review - date
DROP TABLE review;
CREATE table review (
    id integer PRIMARY KEY,
    rating decimal,
    description varchar(100),
	review_date varchar,
    restaurant_id integer REFERENCES restaurant(id)
);


/* 
 *--------------------------------------------
 Insert values for restaurant
 *--------------------------------------------
 */
INSERT INTO restaurant VALUES (
  1,
  'Bytes of China',
  'Delectable Chinese Cuisine',
  3.9,
  '6175551212',
  'Mon - Fri 9:00 am to 9:00 pm, Weekends 10:00 am to 11:00 pm'
);

/* 
 *--------------------------------------------
 Insert values for address
 *--------------------------------------------
 */
INSERT INTO address VALUES (
  1,
  '2020',
  'Busy Street',
  'Chinatown',
  'MA',
  'http://bit.ly/BytesOfChina',
  1
);

/* 
 *--------------------------------------------
 Insert values for review
 *--------------------------------------------
 */
INSERT INTO review VALUES (
  1,
  5.0,
  'Would love to host another birthday party at Bytes of China!',
  '05-22-2020',
  1
);

INSERT INTO review VALUES (
  2,
  4.5,
  'Other than a small mix-up, I would give it a 5.0!',
  '04-01-2020',
  1
);

INSERT INTO review VALUES (
  3,
  3.9,
  'A reasonable place to eat for lunch, if you are in a rush!',
  '03-15-2020',
  1
);

/* 
 *--------------------------------------------
 Insert values for category
 *--------------------------------------------
 */
INSERT INTO category VALUES (
  'C',
  'Chicken',
  null
);

INSERT INTO category VALUES (
  'LS',
  'Luncheon Specials',
  'Served with Hot and Sour Soup or Egg Drop Soup and Fried or Steamed Rice  between 11:00 am and 3:00 pm from Monday to Friday.'
);

INSERT INTO category VALUES (
  'HS',
  'House Specials',
  null
);

/* 
 *--------------------------------------------
 Insert values for dish
 *--------------------------------------------
 */
INSERT INTO dish VALUES (
  1,
  'Chicken with Broccoli',
  'Diced chicken stir-fried with succulent broccoli florets',
  false
);

INSERT INTO dish VALUES (
  2,
  'Sweet and Sour Chicken',
  'Marinated chicken with tangy sweet and sour sauce together with pineapples and green peppers',
  false
);

INSERT INTO dish VALUES (
  3,
  'Chicken Wings',
  'Finger-licking mouth-watering entree to spice up any lunch or dinner',
  true
);

INSERT INTO dish VALUES (
  4,
  'Beef with Garlic Sauce',
  'Sliced beef steak marinated in garlic sauce for that tangy flavor',
  true
);

INSERT INTO dish VALUES (
  5,
  'Fresh Mushroom with Snow Peapods and Baby Corns',
  'Colorful entree perfect for vegetarians and mushroom lovers',
  false
);

INSERT INTO dish VALUES (
  6,
  'Sesame Chicken',
  'Crispy chunks of chicken flavored with savory sesame sauce',
  false
);

INSERT INTO dish VALUES (
  7,
  'Special Minced Chicken',
  'Marinated chicken breast sauteed with colorful vegetables topped with pine nuts and shredded lettuce.',
  false
);

INSERT INTO dish VALUES (
  8,
  'Hunan Special Half & Half',
  'Shredded beef in Peking sauce and shredded chicken in garlic sauce',
  true
);

/*
 *--------------------------------------------
 Insert valus for cross-reference table, categories_dishes
 *--------------------------------------------
 */
INSERT INTO categories_dishes VALUES (
  'C',
  1,
  6.95
);

INSERT INTO categories_dishes VALUES (
  'C',
  3,
  6.95
);

INSERT INTO categories_dishes VALUES (
  'LS',
  1,
  8.95
);

INSERT INTO categories_dishes VALUES (
  'LS',
  4,
  8.95
);

INSERT INTO categories_dishes VALUES (
  'LS',
  5,
  8.95
);

INSERT INTO categories_dishes VALUES (
  'HS',
  6,
  15.95
);

INSERT INTO categories_dishes VALUES (
  'HS',
  7,
  16.95
);

INSERT INTO categories_dishes VALUES (
  'HS',
  8,
  17.95
);

--10
SELECT name, address.addr_number, address.addr_street
FROM restaurant
JOIN address
ON restaurant.id = address.restaurant_id;

--11
SELECT MAX(rating) as "Best Rating"
FROM review;


-- 12
SELECT dish.name AS "dish_name",
	price,
	category.name
FROM dish
JOIN categories_dishes 
ON dish.id = categories_dishes.dish_id
JOIN category
ON categories_dishes.category_id = category.id
ORDER by dish_name;


-- 13
SELECT category.name AS "category",
	dish.name as "dish_name",
	price
FROM category
JOIN categories_dishes 
ON categories_dishes.category_id = category_id
JOIN dish
ON dish.id = categories_dishes.dish_id
ORDER by category;


-- 14
SELECT dish.name AS "spicy_dish_name",
	category.name,
	price
FROM dish
JOIN categories_dishes 
ON dish.id = categories_dishes.dish_id
JOIN category
ON categories_dishes.category_id = category.id
WHERE dish.hot_and_spicy = true;


-- 15
SELECT categories_dishes.dish_id, COUNT(categories_dishes.dish_id)
FROM dish
JOIN categories_dishes 
ON categories_dishes.dish_id = dish.id
JOIN category 
ON categories_dishes.category_id = category.id
GROUP BY categories_dishes.dish_id
ORDER BY categories_dishes.dish_id;


-- 16
SELECT categories_dishes.dish_id, COUNT(categories_dishes.dish_id)
FROM dish
JOIN categories_dishes 
ON categories_dishes.dish_id = dish.id
JOIN category 
ON categories_dishes.category_id = category.id
GROUP BY categories_dishes.dish_id
HAVING COUNT(categories_dishes.dish_id) > 1;


-- 17
SELECT categories_dishes.dish_id, 
	COUNT(categories_dishes.dish_id) as dish_count, 
	dish.name as dish_name
FROM dish
JOIN categories_dishes 
ON categories_dishes.dish_id = dish.id
JOIN category 
ON categories_dishes.category_id = category.id
GROUP BY categories_dishes.dish_id, dish.name
HAVING COUNT(categories_dishes.dish_id) > 1;


-- 18
WITH temporaryTable (best_review) as
    (SELECT MAX(rating) as "Best Rating"
	FROM review)
    SELECT description, best_review as "Best review score"	
	FROM review, temporaryTable
	WHERE review.rating = best_review;
	-- Not sure this is ok as might have non-disctinct values
 















  












