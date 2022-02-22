const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const db = require('../server/database')
const mysql = require("mysql2");
const cors = require('cors');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(__dirname + "../client/public/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('dist'));
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//below is a test server function
//app.get('/api', (req, res) => {
//    res.json({"users":["userOne", "userTwo", "userThree"]})
//
//})

// example of using DB query

// app.get('/users', (req, res) => {
//
//     let state = `SELECT * FROM cloudscratch.tablescratch;`;
//
//     db.query(state, function(err, result) {
//         console.log(result);
//         res.send(result);
//     })
// })


// app.get('/*', function(req,res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// })

app.get("/DoctorPatientProfile", (req, res) => {
    db.query("SELECT U.Fname, U.Lname, P.Status, P.Flagged FROM 390db.users U, 390db.patients P WHERE U.ID = P.ID;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
