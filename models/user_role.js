const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserRoleSchema = new Schema({
    userID: {type: String, required: true},
    roleID: {type: String, required: true},
    create_time: Date,
    updated: Date
});

// UserRoleSchema
//     .virtual('url')
//     .get(function () {
//         return '/User_Role/' + this._id;
//     });

module.exports = mongoose.model('User_Role', UserRoleSchema, 'User_Role');