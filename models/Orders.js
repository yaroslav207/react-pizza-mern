const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    status: {type: Boolean, default: false},
    amount: {type: Number, required: true},
    orderList:{type: Object, required: true},
    date: {type: Date, default: Date.now},
    client: {type: Types.ObjectId, ref: 'User'},
    orderId: {type: Number}
})

module.exports = model('Orders', schema)