//importing packages
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');
const webhook = require('./route/webhook');
const aptiQARoutes =require('./route/aptiQARoutes')
const mongoose = require('mongoose');

//initializing app
dotenv.load();
const app = express();
const spiaiApp = apiai(process.env.APIAI_ACCESS);

//Configuring port and other settings
app.set('PORT', (process.env.PORT));
app.set("view options", {
    layout: false
});

//Using Middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.use('/',webhook);
app.use('/aptiQA',aptiQARoutes);

//setting mongodb connection
mongoose.connect(`mongodb://${process.env.DB_HOST_DEV}:${process.env.DB_PORT}/${process.env.DB}`, { useMongoClient: true });
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB on port %d ",process.env.DB_PORT);
})
mongoose.connection.on('error', (err) => {
    if (err)
        console.log('%s error occured',err);
})

//Starting server
const server = app.listen(app.get('PORT'), function () {
    console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});