const User = require('../models/user');
const userRole = require('../models/user_role');
const permission = require('../models/permission');
const role = require('../models/role');
const rolePer = require('../models/role_permission');
const UserService = require('../services/UserService');

const Auth = class {
    constructor(user) {
        this.user = user;
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
        const user = this.user;
        userRole.find({user_id: user.id}).populate('role_id').exec(function (error, doc) {
            if (!error) {
                console.log(doc);
            }
            else {
                console.log('faild to find user role')
            }
        });
    }

    getPermission() {
        const roleID = this.user.role_id;

        rolePer.find()
    }
};