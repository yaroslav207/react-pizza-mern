const {Schema, model} = require('mongoose');

const schema = new Schema({
    _id:{type: String},
    sequence_value: {type: Number}
})

// const Counter = model('Counter', schema)
// category = new Counter({_id: 'order', sequence_value: 100000})
// category.save()

module.exports = model('Counter', schema)