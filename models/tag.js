const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TagSchema = new Schema({
    context: {type: String, required: true},
    tagID: {type: ObjectId },
    userID: {type: Schema.ObjectId, ref: 'USER', required: true }
});

TagSchema
    .virtual('url')
    .get(function () {
        return '/tag/' + this._id;
    });

module.exports = mongoose.model('Tag', TagSchema, 'Tag');