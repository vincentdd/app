const User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const UserService = require('../services/UserService');
const jwt = require('express-jwt');

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
            // There are errors. Render form again with sanitized values/errors messages.
            //res.render('user_form', { title: 'Create User', author: req.body, errors: errors.array() });
            const msg = errors.mapped();
            console.log(`1${msg.password.msg}`);
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
            User.find({username:  req.body.username})
                .then(function (_user) {
                    if(_user.length !== 0) {
                        const responseData = {
                            ...res.locals.responseData,
                            code: -2,
                            message: "Username is already taken"
                        };
                        res.json(responseData);
                        // res.send('' + _user.length);
                        return;
                    }else{
                        const user = new User({
                            username: req.body.username,
                            password: req.body.password
                        });
                        const userService = new UserService();
                        userService.register(user);
                        // user.save(function (err, doc) {
                        //     if (err) {
                        //         console.log(`error:${err}`)
                        //     } else {
                        //         console.log(doc)
                        //     }
                        // })
                        const responseData = {
                            ...res.locals.responseData,
                            code: 0,
                            message: "success"
                        };
                        res.json(responseData);
                    }
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
            console.log(`1${msg.password.msg}`);
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
            User.find({username: req.body.username})
                .then(function (err, user) {
                    if(err){
                        responseData = {
                            ...responseData,
                            code: -4,
                            message: 'Username or password is incorrect'
                        };
                    }else{
                        const {username, password}= user[0];
                        if(password === req.body.password){
                            const token = jwt.sign(user,  {
                                expiresIn : 60*60*24// 授权时效24小时
                            });
                            res.json({
                                success: true,
                                message: '请使用您的授权码',
                                token: token
                            });
                        }else{
                            responseData = {
                                ...responseData,
                                code: -5,
                                message: 'Username or password is incorrect'
                            }
                        }
                    }
                    res.json(responseData);
                });
            return;
        }
    }
];