// jwt.js,token中间件
const jwt = require('express-jwt');
const config = require('../config');
const jwtAuth = jwt({
    secret: config.jwtsecret,
    getToken: function fromHeaderOrQuerystring (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({path: ["/login", "/register"]});

module.exports = jwtAuth;
