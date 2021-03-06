const User = require('../models/user');
const userRole = require('../models/user_role');
const permission = require('../models/permission');
const role = require('../models/role');
const rolePer = require('../models/role_permission');
const UserService = require('../services/UserService');

module.exports = class Auth {
    constructor(user) {
        this.user = user;
        this.user.roleArr = [];
        this.user.perm = [];
        this.getRole.bind(this);
        this.getUser.bind(this);
    }

    getUser() {
        const userService = new UserService();
        const user = this.user;
        userService.findOne({username: user.name}).then(function (err, doc) {
            if (!err) {
                let obj = {username: doc.username, password: doc.password, privateKey: doc.privateKey};
                this.user = {...user, ...obj};
            }
        });
        return this.user;
    }

    getRole() {
        const user = this.user,
            _that = this;
        userRole.find({user_id: user.id}).populate('role_id').exec(function (error, doc) {
            if (!error && doc !== undefined) {
                user.roleArr = doc.map(function (temp) {
                    return {
                        roleID: temp.role_id._id,
                        roleName: temp.role_id.role_name,
                        create_time: temp.role_id.create_time,
                        updated: temp.role_id.updated
                    }
                });
            }
            else {
                console.log('faild to find user role')
            }
            console.log(user);
            return _that;
        });
        return this;
    }

    getPermission() {
        let user = this.user;
        user.roleArr.map(function (temp) {
            rolePer.find({role_id: temp.roleID}).then(function (err, docs) {
                console.log(err);
                if (!err)
                    console.log(doc)
            });
            rolePer.find({role_id: temp.roleID}).populate('permission_id').exec(function (error, doc) {
                if (!error && doc !== undefined) {
                    doc.forEach(function (temp) {
                        user.perm.push({
                            permissionID: temp.permission_id._id,
                            create_time: temp.permission_id.create_time,
                            updated: temp.permission_id.updated
                        })
                    })
                } else {
                    console.log('faild to find permission')
                }
            })
        });
        return this;
    }
};

