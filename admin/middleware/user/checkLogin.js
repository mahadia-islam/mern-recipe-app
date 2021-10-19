const jwt = require('jsonwebtoken');

const checkLogin = (type) => {
    return function (req, res, next) {
        let cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

        if (cookies) {
            try {
                token = cookies[process.env.ADMIN_COOKIE_NAME];
                const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
                req.user = decoded;

                // pass user info to response locals
                if (type === 'routes') {
                    next();
                } else {
                    res.status(200).json({
                        user: req.user
                    });
                }
            }
            catch (err) {
                res.status(401).json({
                    errors: err.message
                });
            }
        } else {
        
            res.status(500).json({
                error: "Authetication failure!",
            });
        
        }
    };
};


module.exports = {
    checkLogin
}