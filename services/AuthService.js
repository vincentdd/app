const User = require('../models/user');
const userRole = require('../models/user_role');
const permission = require('../models/permission');
const role = require('../models/role');
const rolePer = require('../models/role_permission');
const BaseService = require('./BaseService');

class AuthService extends BaseService {
    constructor(user) {
        super(userRole);
        this.user = user;
        this.user.roleArr = [];
        this.user.perm = [];
        this.getRole.bind(this);
        this.getUser.bind(this);
        this.getPremissionByUserName.bind(this);
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

    async fetchRoleArr() {
        try {
            const user = this.user;
            const roleArr = await userRole.find({user_id: user.id}).populate('role_id').exec();
            return {
                code: 0,
                data: {
                    roleArr: [...roleArr]
                }
            };
        } catch {
            console.log(`failed to get role array`)
        }
    }

    async setRoleArr() {
        const temp = await this.fetchRoleArr();
        console.log(temp);
        this.roleArr = temp;
    }

    async getRole() {
        try {
            const user = this.user;
            return await userRole.find({user_id: user.id}).populate('role_id').exec()
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
            console.log(`failed to get Premission`)
        }
    }

    getPreArr(arr) {
        const result = [];
        while (arr.length !== 0) {
            const temp = arr.pop();
            result.push({
                premissionName: temp.premission_id.premission_name,
                createTime: temp.premission_id.create_time,
                updated: temp.premission_id.updated
            })
        }
        return result;
    }

    getRoleArr() {
        try {
            // const temp = then(function (obj) {
            //      return {roleName:}
            // });
            // const result = temp.map(function (obj) {
            //      return {roleName:}
            // })
        } catch {
            console.log(`failed to get Role Array by user name`)
        }
    }

    async getPremissionByUserName() {
        let preArr = [];
        try {
            const tempArr = await this.getRole();
            preArr = await this.getPermission(tempArr);
            return this.getPreArr(preArr);
        } catch {
            console.log(`failed to get Premission by role id`)
        }
    }
}

module.exports = AuthService;