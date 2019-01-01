const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var TagSchema = new Schema({
    context: String,
    tagId: {type: ObjectId, ref: 'Tag', required: true},
});

TagSchema
    .virtual('url')
    .get(function () {
        return '/tag/' + this._id;
    });

module.exports = mongoose.model('Tag', TagSchema, 'Tag');