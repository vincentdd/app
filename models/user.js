const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    privateKey: {type: String, required: true},
    userType: {type: String, required: true}
});

UserSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

module.exports = mongoose.model('User', UserSchema, 'User');