CREATE TABLE Stock (
  item SERIAL NOT NULL,
  number int, --The amount of this item in stock
  PRIMARY KEY (item),
  FOREIGN KEY (item) references Menu(id)
);