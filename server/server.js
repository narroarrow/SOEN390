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
    // const temperature = req.body.temperature;
    // const weight = req.body.weight;
    // const breathing = req.body.breathing;
    // const chest = req.body.chest;
    // const fatigue = req.body.fatigue;
    // const fever = req.body.fever;
    // const cough = req.body.cough;
    // const smell = req.body.smell;
    // const taste = req.body.taste;
    // const symptoms = req.body.symptoms;

    // db.query(
    //      "INSERT INTO 390db.healthinformation () VALUES (?,?,?,?,?,?,?,?,?,?)",
    //      [temperature, weight, breathing, chest, fatigue, fever, cough, smell, taste, symptoms],
    //      (err, results) =>{
    //          if(err){
    //              console.log(err);
    //          }else{
    //              res.send("Form Submitted!");
    //          }
    //      }
    // );

    const patientid = 1;
    const symptom = "test";
    const timestamp = "1970-01-01 00:00:01";
    const weight = req.body.weight;
    const age = 3;
    const gender = "male";
    const sneeze = req.body.fever;
    const cough = req.body.cough;
    const tastesense = req.body.taste;
    const other = req.body.symptoms;

    db.query(
        "INSERT INTO 390db.healthinformation (PatientID, Symptom, Timestamp, Weight, Age, Gender, Sneeze, Cough, TasteSense, Other) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [patientid, symptom, timestamp, weight, age, gender, sneeze, cough, tastesense, other],
            (err, results) =>{
                if(err){
                    console.log(err);
                }else{
                    res.send("Form Submitted!");
                }
            }
    )

});

// app.get('/*', function(req,res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));