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
                result = await this.findAll({
                    $or: [{userId: ObjectId(userID), status: 1}, {
                        userId: {$exists: false},
                        status: 1
                    }]
                });
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
                userId: isCreateTagForAll ? {$exists: false} : {$eq: tag.userId},
                status: 1
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

    async updateTag(tagObj, isAbleEditAll) {
        try {
            const tagModel = this.Model,
                {_id, context, userId} = tagObj;
            let existsCheck = tagModel.find({
                    context: context,
                    $or: [{userId: ObjectId(userId)}, {userId: {$exists: false}}],
                    status: 1
                }),
                targetCheck = tagModel.find({_id: _id, userId: userId, status: 1});

            const [resultOfExistsCheck, resultOfTargetCheck] = await Promise.all([existsCheck, targetCheck]);
            if (resultOfExistsCheck.length !== 0) {
                throw `Tag ${MESSAGE.MES_EXISTS}`;
            } else if (resultOfTargetCheck.length !== 0 && userId === resultOfTargetCheck.userId || isAbleEditAll) {
                return await this.update({_id: _id}, tagObj);
            } else {
                throw `Update tag ${MESSAGE.MES_FAILED}`;
            }
        } catch (e) {
            return ({code: CODE.CODE_FAILED, message: e});
        }
    }
}

module.exports = TagService;