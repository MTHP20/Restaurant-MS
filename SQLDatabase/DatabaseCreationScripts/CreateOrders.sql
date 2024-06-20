CREATE TABLE orders (
    order_number SERIAL,
    time_ordered TIME,
    confirmed BOOLEAN,
    complete BOOLEAN,
    delivered BOOLEAN
	table_no int,
    paid BOOLEAN,
	PRIMARY KEY (order_number),
	FOREIGN KEY (table_no) REFERENCES Tables(table_no)
);