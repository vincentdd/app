const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const UserService = require('../services/UserService');
// const UserRoleService = require('../services/UserRoleservice');
const AuthService = require('../services/AuthService');
const User = require('../models/user');
const userRole = require('../models/user_role');
const permission = require('../models/permission');
const role = require('../models/role');
const rolePer = require('../models/role_permission');
// const Auth = require('./common');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');
const Constant = require('../utils/constant');
const {CODE, MESSAGE} = require('../utils/response');
const userException = require('../utils/exception');

exports.sign_up = [
    body('username').isLength({min: 1}).trim().withMessage('user name must be specified.')
        .isAlphanumeric().withMessage('user name has non-alphanumeric characters.'),
    body('password').isLength({min: 1}).trim().withMessage('password must be specified.')
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
        } else {
            const userService = new UserService();
            userService.findOne({username: req.body.username})
                .then(function (user) {
                    // console.log(`sign up ${user}`);
                    const responseData = {
                        ...res.locals.responseData,
                        code: -2,
                        message: "Username is already taken"
                    };
                    res.json(responseData);
                    // res.send('' + _user.length);
                    return;
                }, function (err) {
                    let user = {username: req.body.username, password: req.body.password},
                        constant = new Constant(user),
                        {username, password, privateKey} = constant.getPrivateKey().getHash().user;
                    user = {username: username, password: password, privateKey: privateKey};
                    console.log(user);
                    let saveDone = userService.save(user);
                    saveDone.then(() => {
                        const responseData = {
                            ...res.locals.responseData,
                            code: 0,
                            message: MESSAGE.MES_SUCCESS
                        };
                        res.json(responseData);
                    }, () => {
                        const responseData = {
                            ...res.locals.responseData,
                            code: -1,
                            message: MESSAGE.MES_FAILED
                        };
                        res.json(responseData);
                    });
                });
        }
    }
];

exports.sign_in = [
    body('username').isLength({min: 1}).trim().withMessage('user name must be specified.')
        .isAlphanumeric().withMessage('user name has non-alphanumeric characters.'),
    body('password').isLength({min: 1}).trim().withMessage('password must be specified.')
        .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        let responseData = {...res.locals.responseData};
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
        } else {
            const userService = new UserService();
            userService.findOne({username: req.body.username})
                .then(function (user) {
                    let obj = {username: req.body.username, password: req.body.password, privateKey: user.privateKey},
                        constant = new Constant(obj);
                    if (constant.getHash().compareUser(user)) {
                        //**********************************
                        // let auth = new Auth({...obj, id: user.id});
                        // auth.getRole().getPermission();
                        let authService = new AuthService({...obj, id: user.id});
                        console.log(authService.getPremissionByUserName());
                        // console.log(authService.setRoleArr());
                        //**********************************
                        let token = jwt.sign({foo: 'bar'}, config.jwtsecret, {
                            expiresIn: '1d', // 授权时效1天
                        });
                        responseData = {
                            ...responseData,
                            code: 0,
                            message: MESSAGE.MES_SUCCESS,
                            token: token,
                            id: user.id
                        };
                        res.json(responseData);
                    } else {
                        responseData = {
                            ...responseData,
                            code: -1,
                            message: MESSAGE.MES_FAILED,
                        };
                        res.json(responseData);
                    }
                }, function (err) {
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