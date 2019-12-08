const UserException = require('../utils/exception');
const {MESSAGE, CODE} = require('../utils/response');

class BaseService {
    /**
     * 子类构造传入对应的 Model 类
     *
     * @param Model
     */
    constructor(Model) {
        this.Model = Model;
    }


    /**
     * 使用 Model 的 静态方法 create() 添加 doc
     *
     * @param obj 构造实体的对象
     * @returns {Promise}
     */
    async create(obj) {
        let entity = new this.Model(obj);
        try {
            let result = await this.Model.create(entity);
            console.log('create result--> ', obj);
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: result};
        } catch (error) {
            console.log('create error--> ', error);
            return {code: CODE.CODE_FAILED, message: error};
        }
    }


    /**
     * 使用 Model save() 添加 doc
     *
     * @param obj 构造实体的对象
     * @returns {Promise}
     */
    async save(obj) {
        let entity = new this.Model(obj);
        try {
            let result = await entity.save();
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: result};
        } catch (error) {
            console.log('save error--> ', error);
            throw new UserException({code: CODE.CODE_FAILED, message: MESSAGE.MES_FAILED});
        }
    }

    /**
     * 插入多个 docs
     *
     *
     *
     */
    async insertMany(arr) {
        let entity = this.Model;
        try {
            console.log(entity.findOne === undefined);
            console.log(entity.insertMany === undefined);
            let result = await entity.insertMany(arr);
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: result};
        } catch (error) {
            console.log('save error--> ', error);
            throw new UserException({code: CODE.CODE_FAILED, message: MESSAGE.MES_FAILED});
        }
    }

    /**
     * 查询所有符合条件 docs
     *
     * @param condition 查找条件
     * @param constraints 查找配置
     * @returns {Promise}
     */
    async findAll(condition, constraints) {
        try {
            // console.log(`this is condition of find all ${condition.toString()}`);
            let data = await this.Model.find(condition, constraints ? constraints : null).orFail(() => Error('not found'));
            console.log('findAll success--> ', data);
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: data};
        } catch (error) {
            console.log('findAll error--> ', error);
            // return error;
            return {code: CODE.CODE_FAILED, message: error};
        }
    }


    /**
     * 查找符合条件的第一条 doc
     *
     * @param condition 查询条件
     * @param constraints 查找配置
     * @returns {Promise}
     */
    async findOne(condition, constraints) {
        console.log(this.Model.findOne(condition).orFail);
        new Error('User not found')
        try {
            let data = await this.Model.findOne(condition, constraints ? constraints : null).orFail(() => Error('Not found'));
            console.log('findOne success--> ', condition, data);
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: data};
        } catch (error) {
            console.log(`findOne error--> ${error}`);
            return {code: CODE.CODE_FAILED, message: error};
        }
    }

    /**
     * 根据_id查找
     *
     * @param condition _id
     * @returns {Promise}
     */
    async findById(condition) {
        try {
            let data = await this.Model.findById(condition).orFail(() => Error('Not found'));
            console.log('findById success--> ', condition);
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: data};
        } catch (error) {
            console.log(`findById error--> ${error}`);
            return {code: CODE.CODE_FAILED, message: error};
        }
    }

    /**
     * 查找排序之后的第一条
     *
     * @param condition
     * @param orderColumn
     * @param orderType
     * @returns {Promise}
     */
    async findOneByOrder(condition, orderColumn, orderType) {
        try {
            let data = await this.Model.findOne(condition)
                .sort({[orderColumn]: orderType})
                .exec();
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: data};
        } catch (error) {
            console.log(`findOneByOrder--> ${error}`);
            return {code: CODE.CODE_FAILED, message: error};
        }
    }


    /**
     * 更新 docs
     *
     * @param condition 查找条件
     * @param updater 更新操作
     * @returns {Promise}
     */
    async update(condition, updater) {
        try {
            console.log(`this is update--------------------> ${condition}${updater}`);
            let result = await this.Model.updateOne(condition, updater, {multi: false});
            console.log(result.n);
            console.log(result.nModified);
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: result};
        } catch (error) {
            console.log(`update error--> ${error}`);
            return {code: CODE.CODE_FAILED, message: error};
        }
    }


    /**
     * 移除 doc
     *
     * @param condition 查找条件
     * @returns {Promise}
     */
    async remove(condition) {
        try {
            let result = await this.Model.remove(condition);
            return {code: CODE.CODE_SUCCESS, message: MESSAGE.MES_SUCCESS, payload: result};
        } catch (error) {
            console.log(`remove error--> ${error}`);
            return {code: CODE.CODE_FAILED, message: error};
        }
    }
}


module.exports = BaseService;