const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PermissionSchema = new Schema({
    permission_name: {type: String, required: true},
    create_time: Date,
    updated: Date
});

PermissionSchema
    .virtual('url')
    .get(function () {
        return '/permission/' + this._id;
    });

module.exports = mongoose.model('Permission', PermissionSchema, 'Permission');