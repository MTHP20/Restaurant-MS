CREATE TABLE ItemContains (
	item_id SERIAL NOT NULL,
	ingredient VARCHAR(255),
	PRIMARY KEY (item_id, ingredient),
	FOREIGN KEY (item_id) REFERENCES Menu(id)
);