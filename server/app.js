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

app.get("/adminViewingValidatedDoctorData",(req,res) => {

    db.query("SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Phone, Udoctor.Validated FROM 390db.Users Udoctor, 390db.Doctors D WHERE Udoctor.ID = D.ID AND Udoctor.Validated = 1;",(err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get("/adminViewingUnvalidatedDoctorData",(req,res) => {

    db.query("SELECT Udoctor.Fname, Udoctor.Lname, Udoctor.Phone, Udoctor.Validated FROM 390db.Users Udoctor, 390db.Doctors D WHERE Udoctor.ID = D.ID AND Udoctor.Validated = 0;",(err, result) => {
        if(err){
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

app.get("/adminViewingPatientData",(req,res) => {
    db.query("SELECT Upatient.Fname, Upatient.Lname, Upatient.Phone, Udoctor.Fname, Udoctor.Lname FROM 390db.Users Upatient, 390db.Patients P, 390db.Users Udoctor WHERE Upatient.ID = P.ID AND P.DoctorID = Udoctor.ID;",(err, result) => {
        if(err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/doctorViewingTheirPatientData", (req,res) =>{
    let did = 6;
    //hardcoded to doctor ID 6
    db.query("SELECT Upatient.* FROM 390db.Users Upatient, 390db.Patients P, 390db.Doctors D WHERE D.ID = 6 AND P.DoctorID = 6 AND P.ID = Upatient.ID;", [did], (err, result) => {
        if(err){
            console.log("Error!");
            console.log(err);
        } else {
            console.log("No error!");
            res.send(result);
        }
    });
});

app.get("/doctorViewingAllDoctors", (req,res) =>{
    db.query("SELECT Udoctor.* FROM 390db.Users Udoctor, 390db.Doctors D WHERE D.ID =  Udoctor.ID;", (err, result) => {
        if(err){
            console.log("Error!");
            console.log(err);
        } else {
            console.log("No error!");
            res.send(result);
        }
    });
});

app.get("/doctorViewingDoctorPatients", (req,res) =>{
    db.query("SELECT Udoctor.Fname, Udoctor.Lname, Upatient.* FROM 390db.Users Upatient, 390db.Users Udoctor, 390db.Patients P WHERE P.ID = Upatient.ID AND Udoctor.ID = P.DoctorID;", (err, result) => {
        if(err){
            console.log("Error!");
            console.log(err);
        } else {
            console.log("No error!");
            res.send(result);
        }
    });
});

app.get("/doctorViewingAllPatientData", (req,res) =>{
    db.query("SELECT Upatient.* FROM 390db.Users Upatient, 390db.Patients P WHERE P.ID = Upatient.ID;", (err, result) => {
        if(err){
            console.log("Error!");
            console.log(err);
        } else {
            console.log("No error!");
            res.send(result);
        }
    });
});

app.post("/validateDoctor", (req,res) =>{
   let DoctorID = req.body.DoctorID;

   db.query("UPDATE 390db.Users SET Validated = 1 WHERE ID = ?", [DoctorID], (err, result) =>{
       if(err){
           console.log(err);
       } else{
           res.send("Doctor validated!");
       }
   }
   );
});



app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
})

module.exports = app;