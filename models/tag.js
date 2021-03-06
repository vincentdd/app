const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;


const TagSchema = new Schema({
    context: {type: String, required: true},
    tagId: {type: ObjectId },
    userId: {type: ObjectId, ref: 'User' },
    create_time: Date,
    updated: Date
});

TagSchema
    .virtual('url')
    .get(function () {
        return '/tag/' + this._id;
    });

module.exports = mongoose.model('Tag', TagSchema, 'Tag');