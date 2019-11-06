const mongoose = require('mongoose');
const Permission = require('./permission');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var Role_PermissionSchema = new Schema({
    permission_id: {type: ObjectId, ref: 'Permission'},
    role_id: {type: ObjectId, ref: 'Role'},
    create_time: Date,
    updated: Date
});

// UserRoleSchema
//     .virtual('url')
//     .get(function () {
//         return '/User_Role/' + this._id;
//     });

module.exports = mongoose.model('Role_Permission', Role_PermissionSchema, 'Role_Permission');