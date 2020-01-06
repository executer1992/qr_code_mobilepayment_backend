CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  created_date TIMESTAMP,
  modified_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS funds (
  user_id UUID NOT NULL,
  balance NUMERIC(8, 4),
  PRIMARY KEY (user_id),
  CONSTRAINT f_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS funds_history (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  transcation_ammount NUMERIC(8, 4),
  transaction_partner VARCHAR(128) NOT NULL,
  transaction_recieved BOOLEAN NOT NULL,
  transaction_date TIMESTAMP,
  PRIMARY KEY (user_id),
  CONSTRAINT fh_user_id FOREIGN KEY (user_id) REFERENCES users (id)
);

