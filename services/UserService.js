// const UserDao = require('../dao/UserDao');
const User = require('../models/user');
const BaseService = require('./BaseService');
// let userDao = new UserDao();

class UserService extends BaseService{
    constructor(){
        super(User);
    }
    // async getUserList() {
    //     try {
    //         // 调用 dao 层查询数据
    //         let userList = await userDao.findAll();
    //         return userList;
    //     } catch (err) {
    //         console.log(`getUserList error--> ${err}`);
    //         return error;
    //     }
    // }
    // async getUser(obj) {
    //     try {
    //         // 调用 dao 层查询数据
    //         let result = await userDao.findOne(obj);
    //         console.log(`getUser success--> ${result}`);
    //         return result;
    //     } catch (err) {
    //         console.log(`getUser error--> ${err}`);
    //         return error;
    //     }
    // }
    // async register (obj) {
    //     try {
    //         const user = new User(obj);
    //         let rescode = await userDao.save(user);
    //         return rescode;
    //     } catch (err) {
    //         console.log(`register error--> ${error}`);
    //         return error;
    //     }
    // }
}
module.exports = UserService;