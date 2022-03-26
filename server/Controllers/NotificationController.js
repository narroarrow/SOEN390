const express = require("express");
const db = require("../database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const NotificationController = express.Router()

NotificationController.use(express.json());
NotificationController.use(cookieParser());
NotificationController.use(cors({credentials: true, origin: 'http://localhost:3000'}));
NotificationController.use(express.static(path.join(__dirname, "../client/build")));
NotificationController.use(express.static(__dirname + "../client/public/"));
NotificationController.use(bodyParser.urlencoded({extended: true}));
NotificationController.use(bodyParser.json())
NotificationController.use(express.static('dist'));


NotificationController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Gets patient name, and appointment time

NotificationController.get("/retrieveAllNotifications", (req, res) => {
    let doctorID = req.query["id"];
    //parameters: DoctorID
//returns: FName, LName, aptDate, StartTime,EndTime
let state = "SELECT Upatient.Fname, Upatient.Lname, A.aptDate, A.startTime, A.endTime, A.ID " +
"FROM 390db.appointments A, 390db.users Upatient, 390db.doctors D, 390db.patients P " +
"Where A.PatientID = Upatient.ID AND A.doctorID = ? AND P.id=Upatient.id AND P.doctorID = D.id AND A.Notification = 1;"
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

NotificationController.get("/retrieveFormNotifications", (req, res) => {
    let doctorID = req.query["id"];
    console.log(doctorID);
    //parameters: DoctorID
//returns: FName, LName, aptDate, StartTime,EndTime
    let state = "SELECT Upatient.Fname, Upatient.Lname, Upatient.ID, Hi.InfoTimestamp " +
        "FROM 390db.healthinformation Hi, 390db.users Upatient, 390db.doctors D, 390db.patients P " +
        "Where Hi.PatientID = Upatient.ID AND D.ID = ? AND P.id=Upatient.id AND P.doctorID = D.id AND Hi.Notification = 1;"
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

//Gets the total number of appointments
NotificationController.post("/getAllNotificationCount", (req, res) => {
    let doctorID = req.query["id"];
    //parameters: DoctorID
    //returns: (count of rows)
    let state = "SELECT count(*) as notificationCount FROM 390db.appointments A WHERE A.DoctorID = ?"
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

NotificationController.put("/maskFormNotification", (req, res) => {

    let PatientID = req.body.PatientID;
    let  InfoTimestamp=  req.body.InfoTimestamp
    // parameters: timestamp of form, patient ID
    // updates: notification value to 0
    let state = "UPDATE 390db.healthinformation Hi SET Hi.Notification = 0 WHERE InfoTimestamp = ? AND PatientID = ?"
    db.query(state, [InfoTimestamp, PatientID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
});

NotificationController.put("/maskApptNotification", (req, res) => {

    let ApptID = req.body.ID;
    // parameters: ID of appointment
    // updates: notification value to 0
    let state = "UPDATE 390db.appointments A SET A.Notification = 0 WHERE ID = ?"
    db.query(state, [ApptID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})
module.exports = NotificationController;