const User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const UserService = require('../services/UserService');

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
            console.log(errors.mapped());
            const responseData = {
                ...res.locals.responseData,
                code: -1,
                message: errors.mapped().username.msg
            };
            res.json(responseData);
            return;
        }else {
            User.find({username:  req.body.username})
                .then(function (_user) {
                    if(_user.length !== 0) {
                        res.send("Username is already taken");
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
                        res.send(user);
                    }
                });
        }
    }
];
