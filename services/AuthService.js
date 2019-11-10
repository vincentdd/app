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

    async getRole() {
        const user = this.user;
        let count = 0;
        await userRole.find({user_id: user.id}).populate('role_id').exec(function (error, doc) {
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
        });
        console.log(`${count}${user.roleArr.length}`);
        count++;
        return this;
    }

    async getPermission() {
        let user = this.user;
        await user.roleArr.map(function (temp) {
            return rolePer.find({role_id: temp.roleID}).populate('permission_id').exec(function (error, doc) {
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
}

module.exports = AuthService;

// class Auth {
//     constructor(user) {
//         this.user = user;
//         this.user.roleArr = [];
//         this.user.perm = [];
//         this.getRole.bind(this);
//         this.getUser.bind(this);
//     }
//
//     getUser() {
//         const userService = new UserService();
//         const user = this.user;
//         userService.findOne({username: user.name}).then(function (err, doc) {
//             if (!err) {
//                 let obj = {username: doc.username, password: doc.password, privateKey: doc.privateKey};
//                 this.user = {...user, ...obj};
//             }
//         });
//         return this.user;
//     }
//
//     getRole() {
//         const user = this.user,
//             _that = this;
//         userRole.find({user_id: user.id}).populate('role_id').exec(function (error, doc) {
//             if (!error && doc !== undefined) {
//                 user.roleArr = doc.map(function (temp) {
//                     return {
//                         roleID: temp.role_id._id,
//                         roleName: temp.role_id.role_name,
//                         create_time: temp.role_id.create_time,
//                         updated: temp.role_id.updated
//                     }
//                 });
//             }
//             else {
//                 console.log('faild to find user role')
//             }
//             console.log(user);
//             debugger;
//             return _that;
//         });
//         return this;
//     }
//
//     getPermission() {
//         let user = this.user;
//         user.roleArr.map(function (temp) {
//             rolePer.find({role_id: temp.roleID}).then(function (err, docs) {
//                 console.log(err);
//                 if (!err)
//                     console.log(doc)
//             });
//             rolePer.find({role_id: temp.roleID}).populate('permission_id').exec(function (error, doc) {
//                 if (!error && doc !== undefined) {
//                     doc.forEach(function (temp) {
//                         user.perm.push({
//                             permissionID: temp.permission_id._id,
//                             create_time: temp.permission_id.create_time,
//                             updated: temp.permission_id.updated
//                         })
//                     })
//                 } else {
//                     console.log('faild to find permission')
//                 }
//             })
//         });
//         return this;
//     }
// };

