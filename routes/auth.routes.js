const {Router} = require('express');
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router();
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth.middleware')

// /api/auth/register
router.post(
    '/register',
    [
        check('login', 'Некорректный email').isEmail(),
        check('password', 'Минимальныя длина пароля 6 символов')
            .isLength({min: 6}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const {login, password, phone} = req.body;

            const candidate = await User.findOne({email: login})

            if (candidate) {

                res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({email: login, password: hashedPassword, phone})

            await user.save();

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    }
    );

// /api/auth/login
router.post(
    '/login',
    [check('username', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    massage: 'Некорректные данные при входе в систему'
                })
            }

            const {username, password} = req.body;

            const user = await User.findOne({email: username})

            if(!user){
                res.status(400).json({message: 'Пользователь не найден'})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message: 'Неверный пароль'})
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '12h'}
                )
            res.json({token, userId: user.id, isAdmin: user.admin})

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    }
    );

router.post(
    '/isAuth',
    auth,
    async (req, res) => {
        try {
            const {userId} = req.body
            const user = await User.findOne({_id: userId})
            res.json({user: user._id})
        }
        catch (e){
            res.status(500).json({message: 'Что-то пошло не так'})
        }
    }
    );

module.exports = router