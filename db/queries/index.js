const QueryFile = require("pg-promise").QueryFile;
const path = require("path");

// Helper for linking to external query files:
function sql(file) {
    const fullPath = path.join(__dirname, file); // generating full path;
    return new QueryFile(fullPath, { minify: true });
}

module.exports = {
    user: {
        check: sql("../sql/user/checkUser.sql"),
        password: sql("../sql/user/checkPassword.sql"),
        new: sql("../sql/user/newUser.sql"),
        blacklist: sql("../sql/user/blacklistJwt.sql"),
        logOut: sql("../sql/user/logOut.sql"),
        assignRole: sql("../sql/user/assignRole.sql")
    },
}