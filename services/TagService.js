const BaseService = require('./BaseService');
let Tag = require('../models/tag');
const {MESSAGE, CODE} = require('../utils/response');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class TagService extends BaseService {
    constructor() {
        super(Tag);
    }

    async personalQuery(userID) {
        try {
            const tagModel = this.Model;
            const result = await tagModel.find({userId: ObjectId(userID)});
            console.log(result);
            return result;
        } catch (error) {
            console.log('get tags error--> ', error);
            throw new UserException({code: CODE.CODE_FAILED, message: MESSAGE.MES_FAILED});
        }
    }

    async commonQuery() {
        try {
            const tagModel = this.Model;
            const result = await tagModel.find().where('userId').exists(false);
            console.log(result);
            return result;
        } catch (error) {
            console.log('get tags error--> ', error);
            throw new UserException({code: CODE.CODE_FAILED, message: MESSAGE.MES_FAILED});
        }
    }
}

module.exports = TagService;