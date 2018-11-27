const accessUser = (req, res) => {
    const { email, role } = req.token
    if (role === undefined) {
        res.send({status: 200, message: `You are logged as: ${email} but you need to select a role before going forward!`})
    } else {
        res.send({status: 200, message: `You are logged as: ${email} and your role is: ${role}`})
    }
}

module.exports = { accessUser }