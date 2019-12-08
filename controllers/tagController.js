const Tag = require('../models/tag');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const TagService = require('../services/TagService');
const {CODE, MESSAGE} = require('../utils/response');
const AuthService = require('../services/AuthService');

exports.createTag = [
    body('context').isLength({min: 1}).trim().withMessage('tag name must be specified.'),
    sanitizeBody('context').trim().escape(),
    sanitizeBody('flag').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
        } else {
            const flag = req.body.flag, permissionArr = req.user.preArr, tagService = new TagService();
            const isCreateTagForAll = AuthService.queryPermission([{permissionName: 'createTagForAll'}], permissionArr);
            let tag = (isCreateTagForAll && flag === 'all')
                ? {context: req.body.context}
                : {context: req.body.context, userId: req.user.userID};
            tagService.addTag(isCreateTagForAll, tag).then(function (doc) {
                res.json(doc);
            }).catch(function (e) {
                res.json(e);
            })
        }
    }
];

exports.findAll = (req, res, next) => {
    const tagService = new TagService();
    let user = req.user,
        permissionArr = user.preArr,
        flag = req.query.flag,
        isFindAllTag = AuthService.queryPermission([{permissionName: 'queryAllTag'}], permissionArr);
    flag = isFindAllTag && flag === 'all'
        ? flag
        : 'undefined';
    tagService.tagQuery(flag, user.userID).then(function (_result) {
        res.json(_result);
    });
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
        const errors = validationResult(req),
            tagService = new TagService(),
            tagId = req.params.id,
            context = req.body.context,
            userId = req.user.userID,
            isAbleEditAll = AuthService.queryPermission([{permissionName: 'editAllTag'}]);
        if (!errors.isEmpty() || tagId === undefined) {
            res.json({errors: errors.mapped()});
        }
        let target = tagService.updateTag(tagId, context, userId, isAbleEditAll);

        if (target.code === 0 && userId === userIdOfTag || isAbleEditAll) {
            tagService.update(conditions, tag).then(function (temp) {
                console.log('更新成功：' + temp);
                res.json({code: CODE.CODE_SUCCESS, msg: MESSAGE.MES_SUCCESS});
            }, function (err) {
                console.log('更新失败：' + err);
                res.json({code: CODE.CODE_FAILED, msg: MESSAGE.MES_FAILED});
            })
        } else
            res.json({code: CODE.CODE_FAILED, msg: MESSAGE.MES_FAILED})
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
];