let BaseDao = require('./BaseDao');
// 导入对应的实体
let Tag = require('../models/tag');

class TagDao extends BaseDao{
    constructor() {
        super(Tag);
    }
    //如果有啥特殊需求的话，自己再重写方法咯
}

module.exports = TagDao;