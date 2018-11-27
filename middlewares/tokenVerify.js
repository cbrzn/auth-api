const passport = require("passport");
const jwt = require("jsonwebtoken");
const checkJwt = require("../models/User").checkBlacklist

const tokenVerify = (req, res, next) => {
    const authenticateCallback = async (err, jsonwebtoken) => {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const isInvalid = await checkJwt(token)
            if (err || !jsonwebtoken || isInvalid) {
                return res.send({
                    status: 401,
                    message: "Your token is not valid or null, please log in"
                });
            }        
        } catch (e) {
            console.log(e)
        }                
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.token = decoded;
        next();
    };

    passport.authenticate("jwt", authenticateCallback)(req, res, next);
};

module.exports = tokenVerify;
