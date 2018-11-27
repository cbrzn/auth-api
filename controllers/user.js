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
            if (user.role === null) {
                return res.send({ status: 200, message: "Please select a role, admin or user, use your JWT and send the role you want to be to complete your registration.", token })
            } else {
                return res.send({ status: 200, user, token });
            }
        });
    })(req, res);
};

const requestSignUp = async (req, res) => {
    const { email, password } = req.body
    try {
        if (await User.checkUser(email))
        res.send({ status: 404, message: "Email already registered" })
        
    } catch (e) {
        const user = await User.create(email, password)
        const token = jwt.sign(user, process.env.SECRET_KEY)
        res.send({ status: 200, token, message: "You have just registered! Now you must select a role, admin or user, use your JWT as bearer token and send the role you want to be to complete your registration." })
    }
}

const assignRole = async (req, res) => {
    const { email, role } = req.token
    try {
        if (role === undefined || role === null) {
            const user = await User.assignRole(req.body.role.toLowerCase().trim(), email)
            const token = jwt.sign(user, process.env.SECRET_KEY)
            res.send({ status: 200, token })
        } else {
            res.send({ message: `You already selected a role, which is: ${role}`})
        }
    } catch (e) {
        if (e.constraint === 'users_role_fkey') {
            return res.send({ status: 404, message: "You need to type admin OR user, otherwise it wont work!" })
        }
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

module.exports = { newSession, requestSignUp, logOut, assignRole }