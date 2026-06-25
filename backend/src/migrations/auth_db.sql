CREATE DATABASE auth_db;

USE auth_db;

CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)         NOT NULL,
  email      VARCHAR(150) UNIQUE  NOT NULL,
  password   TEXT                 NOT NULL,
  created_at TIMESTAMP            DEFAULT CURRENT_TIMESTAMP
);