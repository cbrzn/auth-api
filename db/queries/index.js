const QueryFile = require("pg-promise").QueryFile;
const path = require("path");

// Helper for linking to external query files:
function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
    user: {
        check: sql("../sql/checkUser.sql"),
        password: sql("../sql/checkPassword.sql"),
        new: sql("../sql/newUser.sql"),
        blacklist: sql("../sql/blacklistJwt.sql"),
        logOut: sql("../sql/logOut.sql")
    },
}