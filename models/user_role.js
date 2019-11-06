const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var UserRoleSchema = new Schema({
    user_id: {type: ObjectId, ref: 'User', required: true},
    role_id: {type: ObjectId, ref: 'Role'},
    create_time: Date,
    updated: Date
});

module.exports = mongoose.model('User_Role', UserRoleSchema, 'User_Role');