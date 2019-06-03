const User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const constant = require('../utils/constant');

exports.sign_up = [
    body('username').isLength({ min: 1 }).trim().withMessage('user name must be specified.')
        .isAlphanumeric().withMessage('user name has non-alphanumeric characters.'),
    body('password').isLength({ min: 1 }).trim().withMessage('password must be specified.')
        .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const msg = errors.mapped();
            console.log(`${msg.password.msg}`);
            let temp = msg.username || msg.password;
            console.log(temp);
            const responseData = {
                ...res.locals.responseData,
                code: -1,
                message: temp.msg
            };
            res.json(responseData);
            return;
        }else {
            const userService = new UserService();
            userService.findOne({username:  req.body.username})
                .then(function (user) {
                    console.log(`sign up ${user}`);
                    const responseData = {
                        ...res.locals.responseData,
                        code: -2,
                        message: "Username is already taken"
                    };
                    res.json(responseData);
                    // res.send('' + _user.length);
                    return;
                },function(err){
                    let pwd = req.body.password,
                        { password, privateKey } = constant.getHash(pwd);
                    const user = { username: req.body.username, password: password, privateKey: privateKey };
                    userService.save(user);
                    const responseData = {
                        ...res.locals.responseData,
                        code: 0,
                        message: "success"
                    };
                    res.json(responseData);
                });
        }
    }
];

exports.sign_in = [
    body('username').isLength({ min: 1 }).trim().withMessage('user name must be specified.')
        .isAlphanumeric().withMessage('user name has non-alphanumeric characters.'),
    body('password').isLength({ min: 1 }).trim().withMessage('password must be specified.')
        .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        let responseData = { ...res.locals.responseData };
        if (!errors.isEmpty()) {
            const msg = errors.mapped();
            console.log(`login error:${msg.password.msg}`);
            let temp = msg.username || msg.password;
            console.log(temp);
            responseData = {
                ...responseData,
                code: -3,
                message: temp.msg
            };
            res.json(responseData);
            return;
        }else {
            const userService = new UserService();
            userService.findOne({username:  req.body.username, password:req.body.password})
                .then(function (user) {
                    let token = jwt.sign({ foo: 'bar' }, 'Why_So_Serious', {
                        expiresIn : '1d', // 授权时效1天
                    });
                    console.log(`1:${user}`);
                    if (user)
                        responseData = {
                            ...responseData,
                            code: 0,
                            message: 'success',
                            token: token
                        };
                    res.json(responseData);
                },function (err){
                        responseData = {
                            ...responseData,
                            code: -5,
                            message: 'Username or password is incorrect'
                        };
                    res.json(responseData);
                });
            return;
        }
    }
];