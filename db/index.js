var pgp = require("pg-promise")();

const connection = {
  host: process.env.DB_HOST || "localhost",
  port: "5432",
  database: process.env.DB_NAME,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "masterkey",
  max: 5000
};

var db = pgp(connection);

module.exports = {
  db
};
