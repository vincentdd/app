const Bill = require('../models/bill');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const BillService = require('../services/BillService');
const { CODE_SUCCESS, CODE_FAILED, MES_SUCCESS, MES_NOT_FOUND, MES_FAILED } = require('../utils/response');

exports.add_bill = [
    body('name').isLength({ min: 1 }).trim().withMessage('name must be specified.'),
    body('price').isLength({ min: 1 }).trim().withMessage('price must be specified.'),
    body('tagId').isLength({ min: 1 }).trim().withMessage('tagId must be specified.'),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('price').trim().escape(),
    sanitizeBody('tagId').trim().escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({errors: errors.mapped()});
            return;
        }else {
            const billService = new BillService();
            const bill = new Bill({
                name: req.body.name,

                tagId: req.body.tagId
            });
            billService.save(bill).then(function (result) {
                res.send({res_code: CODE_SUCCESS, msg: MES_SUCCESS, payload: tag});
            }, function (result) {
                res.send({res_code: CODE_FAILED, msg: MES_FAILED, payload: result});
            });
        }
    }
];

exports.find_all = [];

exports.find_by_id = (req, res, next) => {};

exports.bill_update = [];

exports.find_one = [];