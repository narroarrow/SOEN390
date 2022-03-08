

/* take the doctor availability start and end times, doctor id and availability column from table doctor's hours
add appointment with the patient id, doctor id, notes, dateTime and priority
update record doctor's hours table with availability from 1 to 0 

possible db changes are last login 

*/

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


//used to display the contact information for a doctor
app.get("/contact", (req,res) => {
    let userID = req.body.tempVAR;// pulled from JWT maybe
    state = "SELECT distinct u.FName, u.LName, u.Email, u.Phone FROM 390db.patients p, 390db.users u WHERE p.doctorID = (SELECT DoctorID from 390db.patients p where id = ?) and u.id = (SELECT DoctorID from 390db.patients p where id = ?);"
    db.query(state,[userID,userID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}
)

//see open appointments
app.get("/seeOpenAppointments", (req,res) => {
    let patientID = 1; //maybe pull from JWT

    state = "SELECT StartTime,EndTime, dh.doctorID, u.FName, u.LName FROM 390db.doctorhours dh, 390db.users u WHERE dh.doctorid = (SELECT DoctorID from 390db.patients p where id = ?) and dh.DoctorID= u.id and dh.Availability = 1;"
    //startTime and endTime may be removed and replaced with a time ID
    db.query(state,[patientID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}
)
//maybe we can merge the code below into the seeAppointments 
app.get("/makeAppointments", (req,res) => {
    let docID = req.body.tempVal; //can we fill in this valus on a form with no changes allowed so when it submits the doctorID is carried in automatically from when we brought the lists of open appointments in
    let start = req.body.start
    let end = req.body.end
    let patID = //JWT; 
    //two manipulations one to update the doctorhours and another to insert the appointment.
    state = "UPDATE 390db.doctorhours dh WHERE dh.StartTime = ?,dh.EndTime = ?,dh.availability = 1, dh.doctorID = ?; INSERT INTO 390db.appointments (PatientID,DoctorID,DateTime,Priority) VALUES(?,?,?,5);"

    db.query(state,[start,end,docID,patID,docID,start], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.send(result);
        }
    });
}
)

