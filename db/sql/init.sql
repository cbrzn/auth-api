CREATE TABLE roles (description VARCHAR NOT NULL PRIMARY KEY);
INSERT INTO roles (description) values ('admin');
INSERT INTO roles (description) values ('user');
CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR NOT NULL, password VARCHAR NOT NULL, role VARCHAR, FOREIGN KEY (role) REFERENCES roles (description));
CREATE TABLE blacklist (jwt VARCHAR NOT NULL);