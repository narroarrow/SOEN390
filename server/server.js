const jwt = require('jsonwebtoken');
const express = require('express');
const app = require('./app.js');
const doctorNotification = require('./doctor_notification.js');

const path = require('path');
const bodyParser = require('body-parser')
let db = require('./database')
const mysql = require("mysql2");
// const cors = require('cors');
const bcrypt = require('bcrypt')
var cookieParser = require('cookie-parser')
require('dotenv').config()
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(__dirname + "../client/public/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('dist'));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://sunlit-form-338718.nn.r.appspot.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));