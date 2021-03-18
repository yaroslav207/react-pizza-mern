const {Schema, model, Types} = require('mongoose');
const Categories = require('./Categories')

const schema = new Schema({
    name: {type: String, required: true},
    url: {type: String, required: true},
    types: {type: Array, required: true},
    sizes: {type: Object, required: true, default: {}},
    category: {type: Types.ObjectId, ref: 'Categories', required: true,},
    rating: {type: Number, default: 0}

})

// const Pizzas = model('Pizzas', schema)
// const pizzas = [
//     {
//         "id": 0,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg",
//         "name": "Пепперони Фреш с перцем",
//         "types": [0, 1],
//         "sizes": {"30": 350, "35": 650},
//         "price": 803,
//         "category": 0,
//         "rating": 4
//     },
//     {
//         "id": 1,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg",
//         "name": "Сырная",
//         "types": [0],
//         "sizes": {"26": 250, "30": 350, "35": 650},
//         "price": 245,
//         "category": 1,
//         "rating": 6
//     },
//     {
//         "id": 2,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/6652fec1-04df-49d8-8744-232f1032c44b.jpg",
//         "name": "Цыпленок барбекю",
//         "types": [0],
//         "sizes": {"26": 350, "30": 450, "35": 850},
//         "price": 295,
//         "category": 1,
//         "rating": 4
//     },
//     {
//         "id": 3,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/af553bf5-3887-4501-b88e-8f0f55229429.jpg",
//         "name": "Кисло-сладкий цыпленок",
//         "types": [1],
//         "sizes": {"26": 230, "30": 340, "35": 600},
//         "price": 275,
//         "category": 2,
//         "rating": 2
//     },
//     {
//         "id": 4,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
//         "name": "Чизбургер-пицца",
//         "types": [0, 1],
//         "sizes": {"26": 276, "30": 387, "35": 700},
//         "price": 415,
//         "category": 3,
//         "rating": 8
//     },
//     {
//         "id": 5,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg",
//         "name": "Крэйзи пепперони",
//         "types": [0],
//         "sizes": {"26": 123, "30": 476, "35": 879},
//         "price": 580,
//         "category": 2,
//         "rating": 2
//     },
//     {
//         "id": 6,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d2e337e9-e07a-4199-9cc1-501cc44cb8f8.jpg",
//         "name": "Пепперони",
//         "types": [0, 1],
//         "sizes": {"26": 245, "30": 798, "35": 980},
//         "price": 675,
//         "category": 1,
//         "rating": 9
//     },
//     {
//         "id": 7,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/d48003cd-902c-420d-9f28-92d9dc5f73b4.jpg",
//         "name": "Маргарита",
//         "types": [0, 1],
//         "sizes": {"26": 367, "30": 689, "35": 257},
//         "price": 450,
//         "category": 4,
//         "rating": 10
//     },
//     {
//         "id": 8,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/ec29465e-606b-4a04-a03e-da3940d37e0e.jpg",
//         "name": "Четыре сезона",
//         "types": [0, 1],
//         "sizes": {"26": 290, "30": 689, "35": 790},
//         "price": 395,
//         "category": 4,
//         "rating": 10
//     },
//     {
//         "id": 9,
//         "imageUrl": "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/30367198-f3bd-44ed-9314-6f717960da07.jpg",
//         "name": "Овощи и грибы 🌱",
//         "types": [0, 1],
//         "sizes": {"26": 409, "30": 698, "35": 878},
//         "price": 285,
//         "category": 3,
//         "rating": 7
//     }
// ]
// let pizza
//
// Categories.find()
//     .then((res, rej) => {
//         pizzas.map((item, index) => {
//             console.log(item.category)
//             pizza = new Pizzas({
//                 url: item.imageUrl,
//                 name: item.name,
//                 types: item.types,
//                 sizes: item.sizes,
//                 rating: item.rating,
//                 category: res[item.category].id
//             })
//              pizza.save()
//     })
// })


module.exports = model('Pizzas', schema)