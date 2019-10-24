const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Role_PermissionSchema = new Schema({
    permissionID: {type: String, required: true},
    roleID: {type: String, required: true},
    create_time: Date,
    updated: Date
});

// UserRoleSchema
//     .virtual('url')
//     .get(function () {
//         return '/User_Role/' + this._id;
//     });

module.exports = mongoose.model('Role_Permission', Role_PermissionSchema, 'Role_Permission');