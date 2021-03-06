const jwt = require('jsonwebtoken')
const config = require('config');
const User = require('../models/User')

module.exports = async (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
           return res.status(401).json({message: 'Нет авторизации'})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        const {admin} = await User.findOne({_id: decoded.userId})
        req.user = {_id: decoded.userId, admin: admin}
        next()
    } catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}