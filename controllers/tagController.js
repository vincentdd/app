const Tag = require('../models/tag');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const TagService = require('../services/TagService');
const {CODE, MESSAGE} = require('../utils/response');
const AuthService = require('../services/AuthService');

exports.createTag = [
    body('context').isLength({min: 1}).trim().withMessage('tag name must be specified.'),
    body('userId').isLength({min: 1}).trim().withMessage('userId must be specified.'),
    sanitizeBody('context').trim().escape(),
    sanitizeBody('userId').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
            return;
        } else {
            const tagService = new TagService();
            tagService.findOne({'context': req.body.context})
                .then(function (_context) {
                    console.log(_context);
                    res.send({code: CODE.CODE_FAILED, msg: 'tag is already exists', payload: _context});
                }, function (err) {
                    const tag = new Tag({
                        context: req.body.context,
                        userId: req.body.userId
                    });
                    tagService.save(tag).then(function (result) {
                        res.send({code: CODE.CODE_SUCCESS, msg: MESSAGE.MES_SUCCESS, payload: tag});
                    }, function (result) {
                        res.send({code: CODE.CODE_FAILED, msg: MESSAGE.MES_FAILED, payload: result});
                    });
                });
        }
    }
];

exports.findAll = (req, res, next) => {
    const flag = req.query.flag;
    const tagService = new TagService();
    let user = req.user,
        permissionArr = user.preArr,
        condition;
    (AuthService.authentication(['queryAllTag'], permissionArr).length === 1)&&flag ==='all'
        ? condition = {} :
        condition = {userId: user.userID};
    tagService.personalQuery(user.userID);
    tagService.findAll(condition)
        .then(function (_resule) {
            if (_resule.length !== 0) {
                console.log(_resule);
                res.send({code: CODE.CODE_SUCCESS, payload: [..._resule], msg: MESSAGE.MES_SUCCESS});
            } else {
                res.send({code: CODE.CODE_FAILED, payload: [], msg: MESSAGE.MES_NOT_FOUND});
            }
        }).catch(function (_resule) {
        res.send(_resule);
    });
};

exports.findAllByUser = () => {
    
};

exports.findByID = (req, res, next) => {
    const tagService = new TagService();
    console.log(`find by id: ${req.params.id}S`);
    tagService.findById(req.params.id).then(function (tag) {
        res.json(tag);
    }, function (err) {
        res.json(err);
    });
};

exports.tagUpdate = [
    body('context').isLength({min: 1}).trim().withMessage('tag name must be specified.'),
    sanitizeBody('context').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
            return;
        }
        if (req.params.id) {
            const tagService = new TagService();
            const conditions = {_id: req.params.id},
                tag = {context: req.body.context};

            tagService.update(conditions, tag).then(function (temp) {
                console.log('更新成功：' + temp);
                res.json({code: CODE.CODE_SUCCESS, msg: MESSAGE.MES_SUCCESS});
            }, function (err) {
                console.log('更新失败：' + err);
                res.json({code: CODE.CODE_FAILED, msg: MESSAGE.MES_FAILED});
            })
        }
    }
];


exports.find_one = [
    // body('payload').isLength({ min: 1 }).trim().withMessage('tag name must be specified.'),
    // sanitizeBody('payload').trim().escape(),
    (req, res, next) => {
        const tagService = new TagService();
        res.json(req.body);
        // tagService.findOne(req.body.context)
        //     .then()
    }
]