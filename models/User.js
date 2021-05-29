const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String},
    birthDate: {type: Date},
    sex: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
    phone: {type: Number},
    address: {type: Array}
})

module.exports = model('User', schema)