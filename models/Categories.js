const {Schema, model} = require('mongoose');

const schema = new Schema({
    name:{type: String, required: true}
})

// const categoryNames = [
//     'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
// ]
//
// const Categories = model('Categories', schema)
// let category
// categoryNames.map((item, index) => {
//     category = new Categories({name: item})
//     category.save()
// })


module.exports = model('Categories', schema)