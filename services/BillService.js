const BaseService = require('./BaseService');
let Bill = require('../models/bill');

class BillService extends BaseService{
    constructor() {
        super(Bill);
    }
}

module.exports = BillService;