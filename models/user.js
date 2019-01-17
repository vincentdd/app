const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_name: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: true}
});

UserSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

module.exports = mongoose.model('User', UserSchema, 'User');