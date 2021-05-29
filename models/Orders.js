const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    status: {type: Boolean, default: false},
    amount: {type: Number, required: true},
    orderList:{type: Array, required: true},
    date: {type: Date, default: Date.now},
    client: {type: Types.ObjectId, ref: 'User'},
    orderId: {type: Number},
    city: {type: String},
    street: {type: String},
    numberHome: {type: String},
    numberApartment: {type: String}
})

module.exports = model('Orders', schema)