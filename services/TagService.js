const BaseService = require('./BaseService');
const {MESSAGE, CODE} = require('../utils/response');
let Tag = require('../models/tag');
const UserException = require('../utils/exception');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class TagService extends BaseService {
    constructor() {
        super(Tag);
        this.tagQuery.bind(this);
        this.addTag.bind(this);
        this.updateTag.bind(this);
    }

    async tagQuery(flag, userID) {
        try {
            let result = [];
            const tagModel = this.Model;
            if (flag !== 'all') {
                result = await this.findAll({$or: [{userId: ObjectId(userID)}, {userId: {$exists: false}}]});
                console.log(result);
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

    async addTag(isCreateTagForAll, tag) {//isCreateTagForAll: true or false 是否添加全局分类；tag:分类对象。
        try {
            const tagModel = this.Model;
            let temp = await tagModel.find({
                context: tag.context,
                userId: isCreateTagForAll ? {$exists: false} : {$eq: tag.userId}
            });
            if (temp.length !== 0) {
                return ({code: CODE.CODE_FAILED, message: `Tag ${MESSAGE.MES_EXISTS}`});
            } else {
                return await this.create(tag);
            }
        } catch (e) {
            return ({code: CODE.CODE_FAILED, message: e.message});
        }
    }

    async updateTag(tagId, context, userId, isAbleEditAll) {
        try {
            const tagModel = this.Model;
            let existsCheck = await tagModel.find({
                    context: context,
                    $or: [{userId: ObjectId(userId)}, {userId: {$exists: false}}]
                }),
                targetCheck = await tagModel.find({_id: tagId, userId: userId});
            const temp = await Promise.all([existsCheck, targetCheck]).then((arr) => {

            });
            if (existsCheck.length !== 0)
                return new UserException(MESSAGE.MES_EXISTS);
            else {
                let userIdOfTag = existsCheck.length === 0 ? existsCheck.payload.userId : undefined;
                // return ({code: result.length === 0 ? CODE.CODE_FAILED : CODE.CODE_SUCCESS, payload: result});
            }
        } catch (e) {
            return ({code: CODE.CODE_FAILED, message: e.message});
        }
    }
}

module.exports = TagService;