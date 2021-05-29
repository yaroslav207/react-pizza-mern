const {Router} = require('express');
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()
const bcrypt = require('bcryptjs')
const jsonParse = require('../middleware/jsonParse.middleware')

router.get(
    '/',
    auth,
    async (req, res) => {

        try {
            if (req.user.admin) {
                const result = await User.find({})
                const users = result.map((item) => {
                    return {...item._doc, id: item._id}
                })
                res.json(users)
            }
            res.status(403).json({message: `Нет доступа`})
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.params.id})

            const userData = {name:user.name, phone: user.phone, email: user.email, birthDate: user.birthDate, sex: user.sex, address: user.address}
            res.json(userData)
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
                const hashedPassword = await bcrypt.hash(req.body.password, 12)
                const user = new User({...req.body, password: hashedPassword})
                user.save()
                res.status(201).json({id: user._id, message: `Добавлено`})
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
                await User.deleteOne({_id: req.params.id})
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
                for (const id of filter.id) {
                    await User.deleteOne({_id: id})
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
            console.log(req.body)
            await User.updateOne(
                {_id: req.params.id},
                {...req.body, _id: req.params.id},
                { upsert: true });
            res.status(201).json({message: `Данные обновлены`, data: {...req.body}})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

module.exports = router