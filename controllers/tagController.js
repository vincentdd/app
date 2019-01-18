const Tag = require('../models/tag');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const TagService = require('../services/TagService');
const { CODE_SUCCESS, CODE_FAILED, MES_SUCCESS, MES_NOT_FOUND, MES_FAILED } = require('../utils/response');

exports.add_tag = [
    body('context').isLength({ min: 1 }).trim().withMessage('tag name must be specified.'),
    sanitizeBody('context').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
            return;
        }else {
            const tagService = new TagService();
            tagService.findOne({'context':  req.body.context})
                .then(function (_context) {
                    if(_context){
                        console.log(_context);
                        res.send({res_code: CODE_FAILED, msg:'tag is already exists', payload: _context});
                    }else{
                        const tag = new Tag({
                            context: req.body.context,
                        });
                        tagService.save(tag).then(function(result){
                            res.send({res_code: CODE_SUCCESS, msg: MES_SUCCESS, payload: tag});
                        },function (result) {
                            res.send({res_code: CODE_FAILED, msg: MES_FAILED, payload: result});
                        });
                    }
                });
            return;
        }
    }
];

exports.find_all = (req, res, next) => {
    const tagService = new TagService();
    tagService.findAll()
        .then(function(_resule) {
            if(_resule.length !== 0) {
                console.log(_resule);
                res.send({res_code: CODE_SUCCESS, payload: {..._resule}, msg: MES_SUCCESS});
            } else {
                res.send({res_code: CODE_FAILED, payload:{}, msg: MES_NOT_FOUND});
            }
        });
};

exports.find_one = [
    body('context').isLength({ min: 1 }).trim().withMessage('tag name must be specified.'),
    sanitizeBody('context').trim().escape(),
    (req, res, next) => {
        const tagService = new TagService();
        tagService.findOne(req.body.context)
            .then()
    }
]