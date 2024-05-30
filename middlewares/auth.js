const { getUser } = require('../services/auth')

function checkForAuthentication(req, res, next) {
    const token = req.cookies?.uid
    req.user = null

    if (!token) {
        return next();
    }
    const user = getUser(token);

    req.user = user;
    next();
}

//role based authorization
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/login')

        if (!roles.includes(req.user.role)) return res.end('unathorized..!')

        next();
    }
}

module.exports = { checkForAuthentication, restrictTo }

// function restrictedToLoggedInUserOnly(req, res, next) {
//     const uid = req.cookies?.uid

//     if (!uid) return res.redirect('/login')

//     const user = getUser(uid);

//     if (!user) return res.redirect('/login')

//     req.user = user;
//     next();
// }

// function checkAuth(req, res, next) {
//     const uid = req.cookies?.uid

//     const user = getUser(uid);

//     req.user = user;
//     next();
// }

// module.exports = { restrictedToLoggedInUserOnly, checkAuth }