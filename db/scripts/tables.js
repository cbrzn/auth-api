const path = require("path");
const QueryFile = require("pg-promise").QueryFile;
const fs = require("fs");
const db = require("../").db;

const createInitialTables = sql("../sql/init.sql");

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const tableCreation = () => {
    db.none(createInitialTables).catch(error => {
        console.error(error);
    })
    .then(async () => {
      console.log("successfully created tables on DB");
    })
    .catch(error => {
      console.error(error);
      console.error("Something went wrong. Execute reset.js");
    })
};

module.exports = tableCreation;
