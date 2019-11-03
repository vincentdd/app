// const UserDao = require('../dao/UserDao');
const UserRole = require('../models/user_role');
const BaseService = require('./BaseService');

// let userDao = new UserDao();

class UserRoleService extends BaseService {
    constructor() {
        super(UserRole);
    }
}

module.exports = UserRoleService;