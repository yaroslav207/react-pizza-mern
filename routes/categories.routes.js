const {Router} = require('express');
const Categories = require('../models/Categories')
const auth = require('../middleware/auth.middleware')
const router = Router()
const jsonParse = require('../middleware/jsonParse.middleware')

router.get(
    '/',
    async (req, res) => {
        try {
            const result = await Categories.find({})
            const categories = result.map((item) => {
                return {...item._doc, id: item._id}
            })
            res.status(201).json(categories)

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.get(
    '/:id',
    async (req, res) => {
        try {
            const result = await Categories.findOne({_id: req.params.id})
            const categories = {...result._doc, id: req.params.id}
            res.status(201).json(categories)
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
                const categories = new Categories({...req.body})
                categories.save()
                res.status(201).json({message: `Добавлено`, id: categories._id})
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

                await Categories.deleteOne({_id: req.params.id})
                res.status(201).json({message: `Удалено`})
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
                await Categories.updateOne(
                    {_id: req.params.id},
                    {...req.body},
                    {upsert: true}
                )
                res.status(201).json({message: `Обновлено`, data: {...req.body}})
            }
            res.status(403).json({message: "Нет доступа"})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    }
)

module.exports = router