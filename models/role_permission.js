const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Role_PermissionSchema = new Schema({
    permissionID: {type: ObjectId, ref: 'Permission'},
    roleID: {type: ObjectId, ref: 'Role'},
    create_time: Date,
    updated: Date
});

// UserRoleSchema
//     .virtual('url')
//     .get(function () {
//         return '/User_Role/' + this._id;
//     });

module.exports = mongoose.model('Role_Permission', Role_PermissionSchema, 'Role_Permission');