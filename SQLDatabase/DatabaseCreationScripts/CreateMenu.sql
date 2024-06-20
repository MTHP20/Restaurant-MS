CREATE TABLE Menu (
  id SERIAL NOT NULL,
  name VARCHAR(255),
  calories int,
  diet VARCHAR(255),
  category VARCHAR(255),
  price DECIMAL(12, 2),
  description VARCHAR(255),
  available BOOLEAN,
  PRIMARY KEY (id)
);