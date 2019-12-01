const BaseService = require('./BaseService');
const {MESSAGE, CODE} = require('../utils/response');
let Tag = require('../models/tag');
const UserException = require('../utils/exception');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class TagService extends BaseService {
    constructor() {
        super(Tag);
    }

    async tagQuery(flag, userID) {
        try {
            let result = [];
            const tagModel = this.Model;
            if (flag !== 'all') {
                result = await this.findAll({userId: ObjectId("5c3b35d51b93401298e7e9a7")});
                let temp = await tagModel.find().where('userId').exists(false);
                result = (result.code === 0)
                    ? [...result, ...temp]
                    : [...temp];
                console.log(temp);
            } else {
                result = await this.findAll()
            }
            console.log(result);
            return result;
        } catch (error) {
            console.log('get tags error--> ', error);
            return ({code: CODE.CODE_FAILED, message: MESSAGE.MES_FAILED});
        }
    }

    async addTag(){

    }
    // async commonQuery() {
    //     try {
    //         const tagModel = this.Model;
    //         const result = await tagModel.find().where('userId').exists(false);
    //         console.log(result);
    //         return result;
    //     } catch (error) {
    //         console.log('get tags error--> ', error);
    //         throw new UserException({code: CODE.CODE_FAILED, message: MESSAGE.MES_FAILED});
    //     }
    // }
}

module.exports = TagService;