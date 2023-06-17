-- SELECT 'CREATE DATABASE appreservas'
-- WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'appreservas')\gexec;

CREATE SCHEMA IF NOT EXISTS auth;

SET search_path TO auth;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
  appuserid SERIAL PRIMARY KEY,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  firstname VARCHAR(45) ,
  lastname VARCHAR(45) ,
  roles VARCHAR(45) NOT NULL check (roles in ('user', 'org', 'admin')),
  password VARCHAR(255) NOT NULL
);