const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const db = require('../server/database')
const mysql = require("mysql2");
const cors = require('cors');

//Note to self: This may have to be changed to localhost:8080
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(__dirname + "../client/public/"));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('dist'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//below is a test server function
app.get('/api', (req, res) => {
    res.json({"users":["userOne", "userTwo", "userThree"]})

});

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

app.post("/createSymptomForm", (req,res) => {
    
    let patientid = 1;
    let timestamp = req.body.timestamp;
    let weight = req.body.weight;
    let temperature = req.body.temperature;
    let breathing = req.body.breathing;
    let chest_pain = req.body.chest;
    let fatigue =req.body.fatigue;
    let fever= req.body.fever;
    let cough = req.body.cough;
    let smell = req.body.smell;
    let taste = req.body.taste;
    let other = req.body.symptoms;

    db.query(
        "INSERT INTO 390db.healthinformation (PatientID, Timestamp, Weight, Temperature, Breathing, Chest_Pain, Fatigue, Fever, Cough, Smell, Taste, Other) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [patientid, timestamp, weight, temperature, breathing, chest_pain, fatigue, fever, cough, smell, taste, other],
            (err, results) =>{
                if(err){
                    console.log(err);
                }else{
                    res.send("Form Submitted!");
                }
            }
    );
});

app.get('/patientProfileData', (req, res) => {
    //will need to use the patient ID in the query below
    db.query("SELECT P.FName, P.LName, P.HealthInsurance, P.Status FROM patients P, doctors D WHERE P.id=1 AND D.id=P.doctorID", (err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.get('/doctorViewingPatientData', (req, res) => {
    //will need patient and doctors id
    //also need to see what it is that the doctor will see
    db.query("SELECT P.FName, P.LName, ", (err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

// app.get('/*', function(req,res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));