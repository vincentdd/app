const User = require('../models/user');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.sign_up = [
    body('user_name').isLength({ min: 1 }).trim().withMessage('user name must be specified.')
        .isAlphanumeric().withMessage('user name has non-alphanumeric characters.'),
    body('password').isLength({ min: 1 }).trim().withMessage('password must be specified.')
        .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    sanitizeBody('user_name').trim().escape(),
    sanitizeBody('password').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            //res.render('user_form', { title: 'Create User', author: req.body, errors: errors.array() });
            res.json({errors: errors.mapped()});
            return;
        }else {
            const user = new User({
                user_name: req.body.user_name,
                password: req.body.password
            });
            user.save(function(err){
                if(err){return next(err);}
            });
            res.send({
                user_name: req.body.user_name,
                password: req.body.password
            })
        }
    }
]
