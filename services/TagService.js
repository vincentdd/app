// const TagDao = require('../dao/TagDao');
// let tagDao = new TagDao();
const BaseService = require('./BaseService');
let Tag = require('../models/tag');

class TagService extends BaseService{
    constructor() {
        super(Tag);
    }
    //如果有啥特殊需求的话，自己再重写方法咯
}

module.exports = TagService;
// class TagService {
//     async getTagList() {
//         try {
//             // 调用 dao 层查询数据
//             let tagList = await tagDao.findAll();
//             return tagList;
//         } catch (err) {
//             console.log(`getTagList error--> ${error}`);
//             return error;
//         }
//     }
//     async register (obj) {
//         try {
//             let rescode = await tagDao.save(obj);
//             return rescode;
//         } catch (err) {
//             console.log(`register error--> ${error}`);
//             return error;
//         }
//     }
// }
// module.exports = TagService;