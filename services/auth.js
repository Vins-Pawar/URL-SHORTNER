var jwt = require('jsonwebtoken');

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    // console.log(jwt.sign(payload, secret));
    return jwt.sign(payload, process.env.SECRET)
}

function getUser(token) {
    if (!token)
        return null
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return decoded;
    } catch (err) {
        // console.error('Token verification failed:', err);
        return null;
    }
}

module.exports = { setUser, getUser }
