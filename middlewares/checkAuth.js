const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const tokenProperties = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
};

const getTokenInformation = (jwtPayload, done) => {
    return done(null, jwtPayload);
};

module.exports = new JWTStrategy(tokenProperties, getTokenInformation);