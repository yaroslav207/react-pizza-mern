const {Router} = require('express');
const Categories = require('../models/Categories')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const router = Router()

router.get(
    '/',
    async (req, res) => {
        try {
            const categories = await Categories.find({})

            res.status(201).json(categories)

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.post(
    '/',
    auth,
    async (req, res) => {
        try {
            if (req.user.admin) {
                const categories = new Categories({...req.body})
                categories.save()
                res.status(201).json({message: `Добавлено`})
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
                await Categories.deleteOne({_id: req.body._id})
                res.status(201).json({message: `Удалено`})
            }
            res.status(403).json({message: "Нет доступа"})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.put(
    '/',
    auth,
    async (req, res) => {
        try {
            if (req.user.admin) {
                await Categories.updateOne(
                    {_id: req.body._id},
                    {...req.body},
                    {upsert: true}
                )
                res.status(201).json({message: `Обновлено`})
            }
            res.status(403).json({message: "Нет доступа"})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    }
)

module.exports = router