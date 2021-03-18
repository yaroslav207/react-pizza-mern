const {Router} = require('express')
const Links = require('../models/Categories')
const router = Router()

router.get(
    '/:code',
    async (req, res) => {
        try {
            const link = await Links.findOne({code: req.params.code})

            if (link) {
                link.clicks++
                await link.save()
                return res.redirect(link.from)
            }
            res.status(404).json({message: 'Ссылка не найдена'})
        } catch (e) {
            res.status(500).json({message: `Что-то пошло не так, попробуйте снова ${e}`})
        }
    })

module.exports = router