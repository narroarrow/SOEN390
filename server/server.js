const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const db = require('../server/database')
const mysql = require("mysql2");
const cors = require('cors');
const { request } = require('http');

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

//This post is called when a user tries to submit a symptom form.
//The patient's id is passed along with the symptom information
//so that we can associate it with the right patient.
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

    //This query will be inserting the values that were passed by the user into
    //our Health Information table which holds the information of all the symptom
    //forms. Every symptom form will be related to the patient that submitted it.
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

//This post method is called when the user submits a 
//form to change their current health status. The patient's
//id is passed to this method. 
app.post("/createPatientCovidStatus", (req,res) => {
    let patientStatus = req.body.status;
    let patientid = 1;

    //This query updates the patients table. It sets the status
    //to the value that was submitted for the user that filled in the 
    //form.
    db.query("UPDATE 390db.patients SET Status=? WHERE ID=?",
    [patientStatus, patientid],
    (err, results) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Status Change!");
        }
    }
    );
});

//This is the post method that is called when the user
//submits their edited information. It takes in all the
//information that was sent in the form along with the
//patient's id.
app.post("/editedPatientData", (req,res) =>{
    let patientid = 1;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let phone = req.body.phone;
    let healthinsurance = req.body.healthinsurance;

    //This query finds the patient that wants to edit their information
    //and then updates the values of certain fields.
    db.query(
        "UPDATE 390db.patients SET FName=?, LName=?, Email=?, Phone=?, HealthInsurance=? WHERE ID=?",
        [fname, lname, email, phone, healthinsurance, patientid],
        (err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.send("Edited!");
            }
        }
    );

});

//This is the code that will be executed when the user opens the 
//patient profile page. The user's id will be sent to this function
//by the get.
app.get('/patientProfileData', (req, res) => {
    //will need to use the patient ID in the query below

    //The query below returns all the information that the user will see on their
    //profile by using the patient's id to filter through the different patient-doctor
    //combinations.
    db.query("SELECT P.FName, P.LName, P.HealthInsurance, P.ID, P.Birthday, P.Phone, P.Email, U.FName AS DFName, U.LName AS DLName FROM patients P, doctors D, users U WHERE P.id=1 AND D.id=P.doctorID AND U.ID=D.ID", (err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


//This is the code that will be executed when the patient first 
//goes to the edit profile page so that they can see what it is
//exactly that they need to change. The patient's id is used 
//to retrieve the data.
app.get('/editPatientProfileData', (req, res) => {
    //will need to use the patients id

    //This query will return the patients information that we deem ok to change.
    //It filters the database and looks for the patient with the id that we passed.
    db.query("SELECT P.FName, P.LName, P.Birthday, P.HealthInsurance, P.Phone, P.Email FROM patients P, doctors D WHERE P.id=1 AND D.id=P.doctorID", (err,result) => {
        if(err) {
            console.log(err);
        }else{
            res.send(result);
        }
    });
})



// app.get('/*', function(req,res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));