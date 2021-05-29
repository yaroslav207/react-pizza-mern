const {Router} = require('express');
const Order = require('../models/Orders')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Pizza = require('../models/Pizzas')
const Counter = require("../models/Counter")
const jsonParse = require('../middleware/jsonParse.middleware')

const router = Router()

const decodedKey = (key) => {
    const arr = key.split('/')
    return {id: arr[0], size: arr[1], type: arr[2]}
}

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate({_id: sequenceName}, {$inc: {sequence_value: 1}}
    )
    return sequenceDocument.sequence_value
};

router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const result = req.user.admin ? await Order.find({}) : await Order.find({client: req.user.userId})
            const orders = result ? result.map((item) => ({...item._doc, id: item._id})) : []
            res.json(orders)
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            console.log(req.params.id)
            const result = await Order.findOne({_id: req.params.id})
            const order = {...result._doc, id: req.params.id}
            res.json(order)
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.post(
    '/',
    auth,
    async (req, res) => {
        try {
            const {userId} = req.user
            const pizza = await Pizza.find({});
            const correctedOrderList = req.body.orderList.map ((item) => {
                const {id} = decodedKey(item.id)
                const pizzaInfo = pizza.find(item => item._id + '' === id);
                const price = pizzaInfo.sizes.find(size => size.size === item.size).price
                return {
                    count: item.count,
                    idPizza: id,
                    size: item.size,
                    type: item.type,
                    price: price,
                    totalPrice: price * item.count
                }
            })

            const amount = correctedOrderList.reduce((sum, item) => {
                console.log(`correctedOrderList2 ${item}`)
                return sum + item.totalPrice
            }, 0)

            const order = new Order({
                orderList: correctedOrderList,
                client: userId,
                amount,
                orderId: await getNextSequenceValue('order'),
            })
            order.save()
            res.status(201).json({id: order._id, message: `Добавлено`})

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
                    await Order.deleteOne({_id: id})
                }
                res.status(201).json([...filter.id])
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

                await Order.deleteOne({orderId: req.params.id})
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
                await Order.updateOne(
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