const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_name: String,
    password: String,
    token: String
});

UserSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

module.exports = mongoose.model('User', UserSchema);