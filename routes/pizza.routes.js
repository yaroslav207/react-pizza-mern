const {Router} = require('express');
const Pizzas = require('../models/Pizzas')
const auth = require('../middleware/auth.middleware')
const jsonParse = require('../middleware/jsonParse.middleware')
const path = require('path')

const router = Router()


router.get(
    '/',
    async (req, res) => {
        try {
            const {category, _sort, _order} = req.query
            const result = category ? await Pizzas.find({category: category}) : await Pizzas.find({})
            const pizzas = result.map((item) => {
                return {...item._doc, id: item._id}
            })
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

router.get(
    '/:id',
    async (req, res) => {
        try {
            const result = await Pizzas.findOne({_id: req.params.id})
            const pizza = {...result._doc, id: req.params.id}
            res.status(201).json(pizza)
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.post(
    '/',
    auth,
    jsonParse,
    async (req, res) => {
            try {
            if (req.user.admin) {
                const fileName = Date.now() + req.files.url.name
                const pathImg = path.resolve(__dirname + '/../uploads/' + fileName)
                req.files.url.mv(pathImg,(err) => {
                    if(err){res.status(400).json({message: "Ошибка при загрузке файла"})}
                })
                const pizza = new Pizzas({
                    name: req.body.name,
                    types: req.body.types,
                    sizes: req.body.sizes,
                    category: req.body.category,
                    url: '/uploads/' + fileName
                })
                pizza.save()
                res.status(201).json({...pizza, id: pizza._id, message: `Добавлено`})
            }
            res.status(403).json({message: "Нет доступа"})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.delete(
    '/:id',
    auth,
    async (req, res) => {
        try {
            if (req.user.admin) {
                console.log(req.params.id)
                await Pizzas.deleteOne({_id: req.params.id})
                res.status(201).json({message: `Удалено`})
            }
            res.status(403).json({message: "Нет доступа"})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.delete(
    '/',
    auth,
    async (req, res) => {
        try {
            if (req.user.admin) {
                const filter = JSON.parse(req.query.filter)
                console.log(filter)
                for (const id of filter.id) {
                    await Pizzas.deleteOne({_id: id})
                }
                res.status(201).json([...filter.id])
            }
            res.status(403).json({message: "Нет доступа"})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.put(
    '/:id',
    auth,
    jsonParse,
    async (req, res) => {
        try {
            if (req.user.admin) {
                if(req.files){
                    const fileName = Date.now() + req.files.url.name
                    const pathImg = '/uploads/' + fileName
                    req.files.url.mv(path.resolve(__dirname + '/../' + pathImg),(err) => {
                        if(err){res.status(400).json({message: "Ошибка при загрузке файла"})}
                    })
                } else {

                }
                const data = {...req.body, url: '/uploads/' + fileName}
                await Pizzas.updateOne(
                    {_id: req.params.id},
                    {...data},
                    {upsert: true}
                )
                res.status(201).json({message: `Обновлено`, data})
            }
            res.status(403).json({message: "Нет доступа"})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    }
)


module.exports = router