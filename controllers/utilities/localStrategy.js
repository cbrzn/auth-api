const localStrategy = require("passport-local").Strategy;
const User = require("../../models/User");

const userProperties = { usernameField: "email", passwordField: "password" };

const getUser = async (email, password, done) => {
    try {
        const user = await User.checkUser(email);
        const checkPassword = isMatch => {
          isMatch ? done(null, user) : done(null, false);
        };
        User.checkPassword(password).then(checkPassword);
    } catch (error) {
        return done(null, false, { message: "username not found in our records" });
    }
};

module.exports = new localStrategy(userProperties, getUser);