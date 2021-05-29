module.exports = (req, res, next) => {
    for (const key in req.body) {
        req.body[key] = JSON.parse(req.body[key])
    }
    next()
}