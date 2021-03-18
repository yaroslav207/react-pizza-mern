const {Router} = require('express');
const Pizzas = require('../models/Pizzas')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = Router()

router.get(
    '/',
    async (req, res) => {
        try {
            const {category, _sort, _order} = req.query
            const pizzas = category ? await Pizzas.find({category: category}) : await Pizzas.find({})

            switch (_sort) {
                case 'popular': {
                    pizzas.sort((a, b) => a.rating - b.rating)
                    res.status(201).json({pizzas})
                }
                case 'name': {
                    pizzas.sort((a, b) => {
                            let nameA = a.name.toUpperCase(); // ignore upper and lowercase
                            let nameB = b.name.toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        }
                    )
                    res.status(201).json(pizzas)
                }
                default: {
                    res.status(201).json(pizzas)
                }
            }

            res.status(201).json(pizzas)

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })


module.exports = router