const fs = require('fs');

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(filename, `${req.path} ${req.method} ${req.ip} ${Date.now()}\n`, (err) => {
            if (!err) {
                next();
            }
        })
    }
}

module.exports = { logReqRes };