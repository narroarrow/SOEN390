

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

//Finds the next day in the calenda
function getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + 
                    (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
}


//creates the array that is returned to Client
function arrayMaker(result){
    // console.log(result)
    const returnedAvails = [];
    for(let i = 0; i < Object.keys(result).length; i++){
        if(result[i]["dayName"] !=null){
            //putting the appointment in the right format
            // console.log()
            // returnedAvails.push(`${result[i]["dayName"]} ${result[i]["StartTime"]} - ${result[i]["EndTime"]}`)
            returnedAvails.push(""+getNextDayOfTheWeek(result[i]["dayName"], true).toString().slice(0, 15)+" "+result[i]["StartTime"]+" - "+ result[i]["EndTime"])
        }

    }
    console.log(returnedAvails);
    return returnedAvails;
}


//see open appointments
app.get("/seeOpenAppointments", (req,res) => {
    //getting ID from client
    let patientID = req.query["id"];
    console.log(patientID);
    // state = "SELECT StartTime,EndTime,dh.dayName, dh.doctorID, u.FName, u.LName FROM 390db.doctorhours dh, 390db.users u WHERE dh.doctorid = (SELECT DoctorID from 390db.patients p where id = 1) and dh.DoctorID= u.id and dh.Availability = 1;"
    //non-hard coded 
    state = "SELECT StartTime,EndTime,dh.dayName, dh.doctorID, u.FName, u.LName FROM 390db.doctorhours dh, 390db.users u WHERE dh.doctorid = (SELECT DoctorID from 390db.patients p where id = ?) and dh.DoctorID= u.id and dh.Availability = 1;"

    //SELECT StartTime,EndTime,dh.dayName, dh.doctorID, u.FName, u.LName FROM 390db.doctorhours dh, 390db.users u WHERE dh.doctorid = (SELECT DoctorID from 390db.patients p where id = ?) and dh.DoctorID= u.id and dh.Availability = 1;
    db.query(state,[patientID], (err, result) => {
        if (err) {
            console.log("Error: "+err);
        } else {
            console.log(result);
            res.send(arrayMaker(result));
            // res.send(result);
        }
    });
}
)


app.post("/makeAppointments", (req,res) => {
    var appointment = req.body.appointmentTime;
    var appointmentArray = appointment.split(/(\s+)/);
    let dayName = appointmentArray[0]
    let start = appointmentArray[8]
    let end = appointmentArray[12]
    let patID = req.body.patientID//JWT; 
    // console.log(dayName+"\t"+start+"\t"+ end+"\t"+patID)
    //two manipulations one to update the doctorhours and another to insert the appointment.
    state = "UPDATE 390db.doctorhours dh set dh.availability = 0 WHERE dh.StartTime = ? and dh.EndTime = ? and dh.availability = 1 and dh.dayName = ? and dh.doctorID = (SELECT DoctorID from 390db.patients p where id = ?);"
    db.query(state,[start,end, dayName,patID], (err, result) => {
        if (err) {
            console.log("Error: "+err);
        } else {
            console.log(result);
        }
    }    
    );
    state2 = "INSERT INTO 390db.appointments (PatientID,DoctorID,startTime,endTime,Priority) VALUES(?,(SELECT DoctorID from 390db.patients p where id = ?),?,?,5);"
    
    db.query(state2,[patID,patID,start,end], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(state2);
            res.send(result);
        }
    }
    
    );
}
)