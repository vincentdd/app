// const Tag = require('../models/tag');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const TagService = require('../services/TagService');

exports.add_tag = [
    body('context').isLength({ min: 1 }).trim().withMessage('tag name must be specified.')
        .isAlphanumeric().withMessage('user name has non-alphanumeric characters.'),
    // body('password').isLength({ min: 1 }).trim().withMessage('password must be specified.')
    //     .isAlphanumeric().withMessage('password has non-alphanumeric characters.'),
    sanitizeBody('context').trim().escape(),
    // sanitizeBody('password').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            //res.render('user_form', { title: 'Create User', author: req.body, errors: errors.array() });
            res.json({errors: errors.mapped()});
            return;
        }else {
            TagService.findOne({'context':  req.body.context})
                .then(function (_context) {
                    if(_context.length !== 0) {
                        res.send("context is already exists");
                        // res.send('' + _user.length);
                        return;
                    }else{
                        const tag = new Tag({
                            context: req.body.context,
                            password: req.body.password
                        });
                        const tagService = new TagService();
                        tagService.register(tag);
                        res.send(tag);
                    }
                });
        }
    }
];

exports.find_all = (req, res, next) => {
        const tagService = new TagService();
        const result = tagService.findAll({context: "住"});
        res.send(result);
};