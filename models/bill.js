const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var BillSchema = new Schema({
    context: String,
    price: String,
    tagID: {type: ObjectId, ref: 'Tag', required: false},
    userID: {type: ObjectId, ref: 'User', required: false},
    createDate: Date,
    updated: Date
});

BillSchema
    .virtual('url')
    .get(function () {
        return '/bill/' + this._id;
    });

module.exports = mongoose.model('Bill', BillSchema, 'Bill');