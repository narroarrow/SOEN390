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
app.get('/api', (req, res) => {
    res.json({"users":["userOne", "userTwo", "userThree"]})

})

// example of using DB query

app.get('/users', (req, res) => {

    let state = `SELECT * FROM 390db.Users;`;

    db.query(state, function(err, result) {
        console.log(result);
        res.send(result);
    })
})

app.get("/adminViewingDoctorData",(req,res) => {

    db.query("SELECT Udoctor.Fname, Udoctor.Lname FROM 390db.Users Udoctor, 390db.Doctors D WHERE Udoctor.ID = D.ID;",(err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get("/adminViewingPatientData",(req,res) => {

    db.query("SELECT Upatient.Fname, Upatient.Lname FROM 390db.Users Upatient, 390db.Patients P WHERE Upatient.ID = P.ID;",(err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});



app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
})


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));