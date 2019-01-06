const TagDao = require('../dao/TagDao');
let tagDao = new TagDao();

class TagService {
    async getTagList() {
        try {
            // 调用 dao 层查询数据
            let tagList = await tagDao.findAll();
            return tagList;
        } catch (err) {
            console.log(`getTagList error--> ${error}`);
            return error;
        }
    }
    async register (obj) {
        try {
            let rescode = await tagDao.save(obj);
            return rescode;
        } catch (err) {
            console.log(`register error--> ${error}`);
            return error;
        }
    }
}
module.exports = TagService;