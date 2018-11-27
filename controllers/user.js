const passport = require("passport")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const newSession = async (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err || !user) {
            return res.send({
                status: 400
            });
        }
    
        req.logIn(user, err => {
            if (err) return res.send(err);
            const token = jwt.sign(user, process.env.SECRET_KEY)
            return res.send({ status: 200, user, token });
        });
    })(req, res);
};

const newUser = async (req, res) => {
    const { email, password, role } = req.body
    try {
        const user = await User.create(email, password, role)
        const token = jwt.sign(user, process.env.SECRET_KEY)
        res.send({ status: 200, user, token })
    } catch (e) {
        console.log(e)
        res.send({ status: 500 })
    }
}

const logOut = async (req, res) => {
    const { jwt } = req.body
    try {
        await User.logOut(jwt)
        res.send({ status: 200 })
    } catch (e) {
        console.log(e)
        res.send({ status: 404 })
    }
}

module.exports = { newSession, newUser, logOut }