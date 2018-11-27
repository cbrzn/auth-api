const accessUser = (req, res) => {
    const { email, role } = req.token
    return res.send({status: 200, message: `You are logged as: ${email} and your role is: ${role}`})
}

module.exports = { accessUser }