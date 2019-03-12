const BaseService = require('./BaseService');
let Bill = require('../models/bill');

class BillService extends BaseService{
    constructor() {
        super(Bill);
    }
    //如果有啥特殊需求的话，自己再重写方法咯
}

module.exports = BillService;