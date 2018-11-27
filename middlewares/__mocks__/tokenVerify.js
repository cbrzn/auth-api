const passport = require("passport");
const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
    const authenticateCallback = async (err, jsonwebtoken, info) => {
        const token = req.headers.authorization.split(" ")[1];
            if (err || !jsonwebtoken) {
                return res.send({
                status: 401,
                message: "Your token is not valid or null, please log in"
            });
        }              
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.token = decoded;
        next();
    };

    passport.authenticate("jwt", authenticateCallback)(req, res, next);
};

module.exports = tokenVerify;