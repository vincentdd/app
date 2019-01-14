const Tag = require('../models/tag');
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
            const tagService = new TagService();
            tagService.findOne({'context':  req.body.context})
                .then(function (_context) {
                    if (_context.length !== 0){
                        res.send({rescode:-1, context:"tag is already exists"});
                        return;
                    }else{
                        const tag = new Tag({
                            context: req.body.context,
                        });
                        tagService.save(tag);
                        res.send(tag);
                        return;
                    }
                });
        }
    }
];

exports.find_all = (req, res, next) => {
        const tagService = new TagService();
        tagService.findAll({context: '食'})
            .then(function(_resule) {
                if(_resule.length !== 0) {
                    console.log(_resule);
                    res.send({..._resule});
                } else {
                    res.send({res_code: -1, context:'not found'});
                }
            });
};