const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var BillSchema = new Schema({
    context: String,
    price: String,
    tagId: {type: ObjectId, ref: 'Tag', required: true},
    userName: {type: ObjectId, ref: 'User', required: true}
});

BillSchema
    .virtual('url')
    .get(function () {
        return '/bill/' + this._id;
    });

module.exports = mongoose.model('Bill', BillSchema, 'Bill');