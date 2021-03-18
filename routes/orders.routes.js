const {Router} = require('express');
const Order = require('../models/Orders')
const auth = require('../middleware/auth.middleware')
const config = require('config')
const Pizza = require('../models/Pizzas')
const Counter = require("../models/Counter")

const router = Router()

const decodedKey = (key) => {
    const  arr = key.split('/')
    return {id: arr[0], size: arr[1], type: arr[2]}
}

async function getNextSequenceValue(sequenceName){
    const sequenceDocument = await Counter.findOneAndUpdate({_id: sequenceName}, {$inc:{sequence_value: 1}}
    )
    return sequenceDocument.sequence_value
};

router.post(
    '/add',
    auth,
    async (req, res) => {
        try {

            const {userId} = req.user
            const correctedOrderList = {}

            for (key in req.body.orderList) {
                const {id, size, type} = decodedKey(key)
                const pizzaInfo = await Pizza.findOne({_id: id})
                    correctedOrderList[key] = {
                        count: req.body.orderList[key].items.length,
                        idPizza: id,
                        size,
                        type,
                        price: pizzaInfo.sizes[size],
                        totalPrice: pizzaInfo.sizes[size] * req.body.orderList[key].items.length
                    }
            }

            const amount = Object.keys(req.body.orderList).reduce((sum, item) => { console.log(`correctedOrderList2 ${correctedOrderList[item].totalPrice}`)
                return sum + correctedOrderList[item].totalPrice
            }, 0)

            const order = new Order({
                orderList: correctedOrderList,
                client: userId,
                amount,
                orderId: await getNextSequenceValue('order')
            })
            console.log(order)
            order.save()
            res.status(201).json({id: order.orderId})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

router.get(
    '/',
    auth,
    async (req, res) => {
        try {

            const orders = await Order.find({client: req.user.userId})

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
            const order = await Order.findOne({orderId: req.params.id})

            res.json(order)
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

module.exports = router