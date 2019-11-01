const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserRoleSchema = new Schema({
    userID: {type: ObjectId,ref: 'User', required: true},
    roleID: {type: ObjectId,ref: 'Role'},
    create_time: Date,
    updated: Date
});

// UserRoleSchema
//     .virtual('url')
//     .get(function () {
//         return '/User_Role/' + this._id;
//     });

module.exports = mongoose.model('User_Role', UserRoleSchema, 'User_Role');