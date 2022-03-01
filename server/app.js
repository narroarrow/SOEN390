const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
const db = require('../server/database')
const mysql = require("mysql2");
const cors = require('cors');
const { request } = require('http');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

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

/* This get method will be executed when rendering the DoctorPatientProfile page. The database will be querries to get the patients names, ID, status and whether they have been
flagged or not. The returned list is a list of all patients in the database. */
app.get("/DoctorPatientProfile", (req, res) => {
    db.query("SELECT U.Fname, U.Lname, P.Status, P.Flagged, P.ID, P.DoctorID FROM 390db.users U, 390db.patients P WHERE U.ID = P.ID;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/* This get method be executed when rendering the DoctorPatientProfile page and when rendering the DoctorViewingPatient page (Health official pages as well).
 It returns a list of patients whose profiles have reviewed. This is used to create indicators in the UI when a patient profile has been reviewed such 
 as a filled in eye icon for viewed patients. */
app.get("/Viewed", (req, res) => {
    db.query("SELECT P.ID FROM 390db.patients P, 390db.healthinformation H, 390db.viewed V WHERE P.ID = H.PatientID AND P.ID = V.PatientID GROUP BY P.ID HAVING MAX(V.Timestamp) >= MAX(H.Timestamp);", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/* This get method be executed when rendering the DoctorViewingPatient and HealthOfficialViewingPatient pages. It will take the necessary patient data from the database
and display it in the UI. */
app.get("/doctorViewingPatientData", (req, res) => {
    let pid = req.query.id;
    db.query("SELECT U.Fname, U.Lname, P.ID, P.Status, Udoctor.Fname AS DoctorFirst, Udoctor.Lname AS DoctorLast, U.Email, U.Phone, U.Birthday, U.Address, P.SymptomRequested FROM 390db.patients P, 390db.users U, 390db.users Udoctor WHERE P.ID = ? AND P.ID = U.ID AND P.DoctorID = Udoctor.ID;", [pid], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

/* This get method will return all the previously filled in HealthInformation for a specific patient and dispay it in the UI. */
app.get("/doctorViewingPreviousSymptoms", (req, res) => {
    let pid = req.query.id;
    db.query("SELECT * FROM HealthInformation HI WHERE PatientID=?", [pid], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

      
//below is a test server function
app.get('/api', (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"] })

});

//This post is called when a user tries to submit a symptom form.
//The patient's id is passed along with the symptom information
//so that we can associate it with the right patient.
app.post("/createSymptomForm", (req, res) => {

    let patientid = 1;
    let timestamp = req.body.timestamp;
    let weight = req.body.weight;
    let temperature = req.body.temperature;
    let breathing = req.body.breathing;
    let chest_pain = req.body.chest;
    let fatigue = req.body.fatigue;
    let fever = req.body.fever;
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
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Form Submitted!");
            }
        }
    );
});

//This post method is called when the user submits a 
//form to change their current health status. The patient's
//id is passed to this method. 
app.post("/createPatientCovidStatus", (req, res) => {
    let patientStatus = req.body.status;
    let patientid = 1;

    //This query updates the patients table. It sets the status
    //to the value that was submitted for the user that filled in the 
    //form.
    db.query("UPDATE 390db.patients SET Status=? WHERE ID=?",
        [patientStatus, patientid],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Status Change!");
            }
        }
    );
});

//This is the post method that is called when the user
//submits their edited information. It takes in all the
//information that was sent in the form along with the
//patient's id.
app.post("/editedPatientData", (req, res) => {
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
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
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
    db.query("SELECT U2.FName, U2.LName, P.HealthInsurance, P.ID, U2.Birthday, U2.Phone, U2.Email, U.FName AS DFName, U.LName AS DLName FROM patients P, doctors D, users U, users U2 WHERE P.id=1 AND D.id=P.doctorID AND U.ID=D.ID AND U2.id=P.id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});


/* This post method is called when a docotr clicks the MARK AS REVIEWED button on a patient profile. It will update the 'viewed table' in the database. */
app.post("/markViewed", (req, res) => {
    let PatientID = req.body.PatientID;
    let DoctorID = req.body.DoctorID;
    let datetime = req.body.datetime;
    
    db.query("INSERT INTO 390db.viewed VALUES (?,?,?)", [PatientID, DoctorID, datetime], (err, result) =>{
        if (err) {
            console.log(err);
        } else {
            res.send("Patient profile has been reviewed!");
        }
    });
});

/* This post method is called when a doctor clicks the REQUEST SYMPTOM FORM button on a patient profile. It will update the SymptomRequested attribute in the patient 
table of the DB. */
app.post("/requestForm", (req, res) => {
    let PatientID = req.body.PatientID;

db.query("UPDATE 390db.patients SET SymptomRequested=true where ID=?", [PatientID], (err, result) =>{
    if (err) {
        console.log(err);
    } else {
        res.send("Patient symptom form requested!");
    }
});

});

/* This post method is called when a docotr clicks the FLAG PATIENT button on a patient profile. It will update the Flagged attribute in the patient table of the DB */
app.post("/flagPatient", (req, res) => {
    let PatientID = req.body.PatientID;

db.query("UPDATE 390db.patients SET Flagged=true where ID=?", [PatientID], (err, result) =>{
    if (err) {
        console.log(err);
    } else {
        res.send("Patient has been flagged!");
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
    db.query("SELECT U.FName, U.LName, U.Birthday, P.HealthInsurance, U.Phone, P.Email FROM patients P, users U, doctors D WHERE P.id=1 AND D.id=P.doctorID AND P.id=U.id", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})

// app.get('/*', function(req,res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


module.exports = app;