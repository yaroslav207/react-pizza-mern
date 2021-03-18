

const {Router} = require('express');
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const shortId = require('shortid')
const router = Router()


router.post(
    '/update',
    auth,
    async (req, res) => {
        try {

            const {userId} = req.user
            console.log(req.body)
         await User.updateOne({
                _id: userId
            },  {...req.body}, { upsert: true });


            res.status(201).json({message: `Данные обновлены`})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.userId})

            const userData = {name:user.name, phone: user.phone, email: user.email, birthDate: user.birthDate, sex: user.sex, address: user.address}
            console.log(userData)
            res.json(userData)
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
            console.log(userData)
            res.json(userData)
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

module.exports = router