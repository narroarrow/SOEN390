const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const db = require('./database')
const mysql = require("mysql2");
const cors = require('cors');
const { request } = require('http');

var cookieParser = require('cookie-parser')
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(__dirname + "../client/public/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('dist'));

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post("/RequestChat", (req, res) => {
    let patientid = 1;

    db.query("UPDATE 390db.patients SET ChatRequested=1 WHERE ID=?",
        [patientid],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Chat Requested!");
            }
        }
    );
});

app.post("/acceptChat", (req, res) => {
    console.log("hello");
    let pid = req.body.PatientID;
    console.log(pid);
    console.log("test");
    db.query("UPDATE 390db.patients SET ChatRequested=false WHERE ID=?",
        [pid],
        (err, results) => {
            if (err) {
                console.log(err);
            } 
        }
    );
    db.query("UPDATE 390db.patients SET ChatPermission=true WHERE ID=?",
        [pid],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Chat Accepted!");
            }
        }
    );
});

app.post("/unflagPatient", (req, res) => {
    let PatientID = req.body.PatientID;

    db.query("UPDATE 390db.patients SET Flagged=false where ID=?", [PatientID], (err, result) =>{
        if (err) {
            console.log(err);
        } else {
            res.send("Patient has been unflagged!");
        }
    });

});

module.exports = app;