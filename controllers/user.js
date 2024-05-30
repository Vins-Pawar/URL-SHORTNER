const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require('../services/auth')

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.render('signin')
    }

    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/login')
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body

    if (!email || !password) return res.redirect('/login')

    const user = await User.findOne({
        email,
        password
    })

    if (!user) return res.redirect('/login')

    const token = setUser(user);
    res.cookie('uid', token)
    return res.redirect('/')
}

module.exports = { handleUserSignup, handleUserLogin }