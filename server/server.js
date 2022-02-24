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
app.use(bodyParser.json());

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
    db.query("SELECT U.Fname, U.Lname, P.Status, P.Flagged, P.ID, P.DoctorID FROM 390db.users U, 390db.patients P WHERE U.ID = P.ID;", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/Viewed", (req, res) => {
    db.query("SELECT P.ID FROM 390db.patients P, 390db.healthinformation H, 390db.viewed V WHERE P.ID = H.PatientID AND P.ID = V.PatientID GROUP BY P.ID HAVING MAX(V.Timestamp) >= MAX(H.Timestamp);", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/doctorViewingPatientData", (req, res) => {
    let pid = req.query.id;
    db.query("SELECT U.Fname, U.Lname, P.ID, P.Status, Udoctor.Fname AS DoctorFirst, Udoctor.Lname AS DoctorLast, H.Symptom, H.Weight, H.Age, H.gender FROM 390db.patients P, 390db.users U, 390db.users Udoctor, 390db.healthinformation H WHERE P.ID = ? AND P.ID = U.ID AND P.ID = H.PatientID AND P.DoctorID = Udoctor.ID;", [pid], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

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


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
