

CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products (
	item_id INT(4) NULL,
    product_name VARCHAR(20) NULL,
    department_name VARCHAR(20) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER NULL
    );
    

use bamazon;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES(1001, "Laptop", "Electronics", 799.99, 15), 
(1002, "Camera", "Electronics", 499.99, 20), 
(1010, "Hammer", "Home", 4.99, 100), 
(1011, "Nail", "Home", .99, 1000),
(1012, "Screwdriver", "Home", 3.99, 50), 
(1013, "Shovel", "Home", 29.99, 30), 
(1014, "Hoe", "Home", 19.99, 20),
(1020, "Puck", "Sports", 2.99, 100), 
(1026, "Football", "Sports", 14.99, 50),
(1025, "Bat", "Sports", 49.99, 50),
(1024, "Raquet", "Sports", 49.99, 25),
(1023, "Glove", "Sports", 16.99, 35);


use bamazon;

