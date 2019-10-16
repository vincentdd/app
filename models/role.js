const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RoleSchema = new Schema({
    rolename: {type: String, required: true},
    create_time: Date,
    updated: Date
});

RoleSchema
    .virtual('url')
    .get(function () {
        return '/role/' + this._id;
    });

module.exports = mongoose.model('Role', RoleSchema, 'Role');