const dotenv = require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const passport = require("passport")
const localStategy = require("./controllers/utilities/localStrategy");
const JWTStrategy = require("./middlewares/checkAuth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

const toggleSerializeUser = (user, done) => done(null, user);

passport.serializeUser(toggleSerializeUser);
passport.deserializeUser(toggleSerializeUser);

app.use(morgan("combined"));
app.use("/v1", routes);

passport.use(localStategy);
passport.use(JWTStrategy);

module.exports = app