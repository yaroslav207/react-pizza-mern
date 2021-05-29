const express = require('express')
const config = require('config');
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')



const app = express();
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json({ extended: true }))
app.use(cors());
app.use(fileUpload({}))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "Content-Range");
    res.header("Content-Range", 0-4/4)
    next();
});

const PORT = config.get('port') || 5000

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/order', require('./routes/orders.routes'))
app.use('/api/user-data', require('./routes/user-data.routes'))
app.use('/api/pizza', require('./routes/pizza.routes'))
app.use('/api/categories', require('./routes/categories.routes'))



async function start () {
    try{
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    } catch (e){
        console.log('Server error ',e.message )
        process.exit(1) //?
    }
}

start();

app.listen(PORT, () => {console.log(`App has been started on port ${PORT} ...`)})