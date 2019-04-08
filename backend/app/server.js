const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const config = require('./config/secret.js');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT , OPTIONS , PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Authorization, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true)
mongoose.connect(
    config.MONGO_DB_URI, {
        useNewUrlParser: true
    }).then(() => {
        console.log('connected to mongo')
    }).catch((err) => {
        console.log('failed to mongo')
    })


app.use('/api', routes);

app.listen(port, () => {
    console.log('connected to server')
})