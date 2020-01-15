CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  surname VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS credit_card (
  credit_card_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  credit_card_number DECIMAL(16),
  credit_card_code DECIMAL(3),
  credit_card_cardholder_name VARCHAR(128),
  credit_card_expiration_time TIMESTAMP,
  created_date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS products (
  product_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  product_name VARCHAR(128) NOT NULL,
  product_price NUMERIC(8, 4) NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS products_history (
  products_history_id UUID PRIMARY KEY,
  product_id UUID NOT NULL,
  products_ammount DECIMAL NOT NULL,
  product_price NUMERIC(8, 4) NOT NULL,
  created_date TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (product_id)
);

CREATE TABLE IF NOT EXISTS transaction_history (
  transaction_history_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  sender_credit_card_number DECIMAL(16) NOT NULL,
  receiver_credit_card_number DECIMAL(16) NOT NULL,
  transaction_amount NUMERIC(8, 4) NOT NULL,
  created_date TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

