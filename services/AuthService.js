const User = require('../models/user');
const userRole = require('../models/user_role');
const permission = require('../models/permission');
const role = require('../models/role');
const rolePer = require('../models/role_permission');
const BaseService = require('./BaseService');
const _ = require('lodash');

class AuthService extends BaseService {
    constructor(user) {
        super(userRole);
        this.user = user;
        this.user.roleArr = [];
        this.user.perm = [];
        this.getRole.bind(this);
        this.getUser.bind(this);
        this.getPermissionByUserName.bind(this);
        this.getPreArr.bind(this);
    }

    async getUser() {
        const userService = new UserService();
        const user = this.user;
        await userService.findOne({username: user.name}).then(function (err, doc) {
            if (!err) {
                let obj = {username: doc.username, password: doc.password, privateKey: doc.privateKey};
                this.user = {...user, ...obj};
            }
        });
        return this.user;
    }

    // async fetchRoleArr() {
    // }
    //
    // async setRoleArr() {
    //     const temp = await this.fetchRoleArr();
    //     console.log(temp);
    //     this.roleArr = temp;
    // }
    //
    // getRoleArr() {
    //     try {
    //
    //     } catch {
    //         console.log(`failed to get Role Array by user name`)
    //     }
    // }

    async getRole() {
        try {
            const user = this.user;
            return await userRole.find({user_id: user.id}).populate('role_id')
        } catch {
            console.log(`failed to get role array`)
        }
    }

    async getPermission(arr) {
        let preArr = [];
        try {
            for (let temp of arr) {
                const result = await rolePer.find({role_id: temp.role_id._id}).populate('permission_id');
                preArr = preArr.concat(result);
            }
            return preArr;
        } catch {
            console.log(`failed to get Permission`)
        }
    }

    static queryPermission(targetArr, permissionArr) {
        let result = _.intersectionBy(permissionArr, targetArr, 'permissionName');
        console.log(result);
        return result.length === targetArr.length;
    }

    getPreArr(arr) {
        let user = this.user,
            result = {userName: user.username, timestamp: Date.now(), userID: user.id};
        result.preArr = [];
        while (arr.length !== 0) {
            const temp = arr.pop();
            result.preArr.push({
                permissionName: temp.permission_id.permission_name,
                createTime: temp.permission_id.create_time,
                updated: temp.permission_id.updated
            })
        }
        return result;
    }

    async getPermissionByUserName() {
        let preArr = [];
        try {
            const tempArr = await this.getRole();
            preArr = await this.getPermission(tempArr);
            return this.getPreArr(preArr);
        } catch {
            console.log(`failed to get Permission by role id`)
        }
    }
}

module.exports = AuthService;