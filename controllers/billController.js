const Bill = require('../models/bill');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
const BillService = require('../services/BillService');
const AuthService = require('../services/AuthService');
const {CODE, MESSAGE} = require('../utils/response');

exports.add_bill = [
    body('context').isLength({min: 1}).trim().withMessage('context must be specified.'),
    body('price').isLength({min: 1}).trim().withMessage('price must be specified.'),
    body('tagID').isLength({min: 1}).trim().withMessage('tagID must be specified.'),
    body('userID').isLength({min: 1}).trim().withMessage('userID must be specified.'),
    body('createDate').isLength({min: 1}).trim().withMessage('createDate must be specified.'),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('price').trim().escape(),
    sanitizeBody('tagID').trim().escape(),
    sanitizeBody('userID').trim().escape(),
    sanitizeBody('createDate').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
        } else {
            const billService = new BillService();
            const bill = new Bill({
                context: req.body.name,
                price: req.body.price,
                tagID: req.body.tagID,
                userID: req.body.userID,
                createDate: req.body.createDate,
                updated: Date.now()
            });
            billService.save(bill).then(function (result) {
                res.send({res_code: CODE.CODE_SUCCESS, msg: MESSAGE.MES_SUCCESS, payload: result});
            }, function (result) {
                res.send({res_code: CODE.CODE_FAILED, msg: MESSAGE.MES_FAILED, payload: result});
            });
        }
    }
];

exports.add_bill_list = [
    body('payload').isLength({min: 1}).trim().withMessage('List must be specified.'),
    sanitizeBody('payload').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
        } else {
            const billService = new BillService();
            console.log(req.body.payload);
            const bills = req.body.payload;
            if (bills.length !== 0)
                billService.insertMany(bills).then(function (result) {
                    res.send({res_code: CODE.CODE_SUCCESS, msg: MESSAGE.MES_SUCCESS, payload: result});
                }, function (result) {
                    res.send({res_code: CODE.CODE_FAILED, msg: MESSAGE.MES_FAILED, payload: result});
                });
        }
    }
];

exports.findBill = [
    body('userId').isLength({min: 1}).trim().withMessage('userId name must be specified.'),
    sanitizeBody('userId').trim().escape(),
    sanitizeBody('flag').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req),
            user = req.user,
            {preArr, userID} = user,
            billService = new BillService(),
            flag = req.body.flag,
            isFindAllBill = AuthService.queryPermission([{permissionName: 'queryAllBill'}], preArr);

        if (flag === "all" && isFindAllBill)
            const result = billService.findById(req.params.id);
        else (flag === null || flag === undefined)
        const result = billService.findById(req.params.id);

        result.then(function (tag) {
            res.json(tag);
        }, function (err) {
            res.json(err);
        });
    }];

exports.findAll = (req, res, next) => {
    const billService = new BillService();
    billService.findAll({})
        .then(function (_resule) {
            res.json({code: CODE.CODE_SUCCESS, payload: _resule, msg: MESSAGE.MES_SUCCESS});
        }, function (err) {
            res.json({code: CODE.CODE_FAILED, payload: null, msg: MESSAGE.MES_NOT_FOUND});
        });
};

exports.findByID = (req, res, next) => {
    const billService = new BillService();
    console.log(`find by id: ${req.params.id}S`);
    billService.findById(req.params.id).then(function (bill) {
        res.json(bill);
    }, function (err) {
        res.json(err);
    });
};

exports.bill_update = [
    body('context').isLength({min: 1}).trim().withMessage('context must be specified.'),
    sanitizeBody('context').trim().escape(),
    body('price').isLength({min: 1}).trim().withMessage('price must be specified.'),
    sanitizeBody('price').trim().escape(),
    body('tagID').isLength({min: 1}).trim().withMessage('tagID must be specified.'),
    sanitizeBody('tagID').trim().escape(),
    body('userID').isLength({min: 1}).trim().withMessage('userID must be specified.'),
    sanitizeBody('userID').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
            return;
        }
        if (req.params.id) {
            const billService = new BillService();
            const conditions = {_id: req.params.id},
                bill = {
                    context: req.body.context,
                    price: req.body.price,
                    tagID: req.body.tagID,
                    userID: req.body.userID,
                    updated: Date.now()
                };
            billService.update(conditions, bill).then(function (temp) {
                console.log('更新成功：' + temp);
                res.json({code: CODE.CODE_SUCCESS, msg: MESSAGE.MES_SUCCESS});
            }, function (err) {
                console.log('更新失败：' + err);
                res.json({code: CODE.CODE_FAILED, msg: MESSAGE.MES_FAILED});
            })
        }
    }
];

exports.find_one = [];