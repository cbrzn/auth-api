let User = {}
const jwt = require("jsonwebtoken")

const newSession = async (req, res) => {
    const { email, password } = req.body
    if (User.email === email && User.password === password) {
        const token = jwt.sign(User, process.env.SECRET_KEY)
        res.send({ status: 200, token })
    } 
};

const requestSignUp = async (req, res) => {
    const { email, password } = req.body
    User.email = email
    User.password = password
    res.send({ status: 200 })
}

const logOut = async (req, res) => {
    res.send({ status: 200 })
}

const assignRole = async (req, res) => {
    const { role } = req.body 
    User.role = role
    res/send({ status: 200 })
}

module.exports = { newSession, requestSignUp, logOut, assignRole }