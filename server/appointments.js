

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
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"].indexOf(dayName.slice(0,3).toLowerCase());
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
    console.log("Patient ID: "+patientID);
    // state = "SELECT StartTime,EndTime,dh.dayName, dh.doctorID, u.FName, u.LName FROM 390db.doctorhours dh, 390db.users u WHERE dh.doctorid = (SELECT DoctorID from 390db.patients p where id = 1) and dh.DoctorID= u.id and dh.Availability = 1;"
    //non-hard coded 
    state = "SELECT StartTime,EndTime,dh.dayName, dh.doctorID, u.FName, u.LName FROM 390db.doctorhours dh, 390db.users u WHERE dh.doctorid = (SELECT DoctorID from 390db.patients p where id = ?) and dh.DoctorID= u.id and dh.Availability = 1;"

    //SELECT StartTime,EndTime,dh.dayName, dh.doctorID, u.FName, u.LName FROM 390db.doctorhours dh, 390db.users u WHERE dh.doctorid = (SELECT DoctorID from 390db.patients p where id = ?) and dh.DoctorID= u.id and dh.Availability = 1;
    db.query(state,[patientID], (err, result) => {
        if (err) {
            console.log("Error: "+err);
        } else {
            console.log("Results open: "+result);
            res.send(arrayMaker(result));
            // res.send(result);
            
        }
    });
}
)


app.post("/makeAppointments", (req,res) => {
    var appointment = req.body.appointmentTime;
    // console.log(appointment)


    var appointmentArray = appointment.split(/(\s+)/);
    let dayName = appointmentArray[0]
    let start = appointmentArray[8]
    let end = appointmentArray[12]
    let aptDate = appointmentArray[2]+" "+appointmentArray[4] + " "+ appointmentArray[6]
    let patID = req.body.patientID//JWT; 

    // for( var i =0; i<appointmentArray.length;i++){
    //     console.log(i+" : "+appointmentArray[i])
    // }
    // console.log(dayName+"\t"+start+"\t"+ end+"\t"+patID+"\t"+aptDate)
    //two manipulations one to update the doctorhours and another to insert the appointment.

    //searches for existing appointments
    state = "SELECT * FROM 390db.appointments a where a.PatientID = ? and a.DoctorID = (SELECT DoctorID from 390db.patients p where id = ?);"
    db.query(state,[patID,patID,start, dayName], (err, result) => {

        if(result.length==1){
        //query then modify and update apt table and doctorhours
        
        //first update used to remove availability 
        updateState1 = "UPDATE 390db.doctorhours dh set dh.availability = 0 WHERE dh.StartTime = ? and dh.EndTime = ? and dh.availability = 1 and dh.dayName = ? and dh.doctorID = (SELECT DoctorID from 390db.patients p where id = ?);"
            db.query(updateState1,[start,end,dayName,patID], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("first update: ");
                    console.log(result);

                }
            }
        );

        //second update to free doctor up 
        updateState2 = "UPDATE 390db.doctorhours dh set dh.availability = 1 WHERE dh.StartTime = (select startTime from appointments apt2 where apt2.PatientID = ?) and dh.availability = 0  and dh.dayName = (select dayName from appointments apt2 where apt2.PatientID = ?) and dh.doctorID = (SELECT DoctorID from 390db.patients p where id = ?);"
        db.query(updateState2,[patID,patID,patID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("second update: ");
                console.log(result);
            }
        }
        );

        //update the appointment
        updateState3 = "UPDATE 390db.appointments apt set apt.startTime = ?, apt.endTime = ?, apt.aptDate = ?, apt.dayName = ? WHERE apt.doctorID = (SELECT DoctorID from 390db.patients p where id = ?) and apt.PatientID = ?;"
        db.query(updateState3,[start,end,aptDate,dayName,patID,patID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("appointment update: ")
                console.log(result);
            }
        }
        
        );
        }
        if(result.length==0){
        //add new appointment with no previous appointment
            state = "UPDATE 390db.doctorhours dh set dh.availability = 0 WHERE dh.StartTime = ? and dh.EndTime = ? and dh.availability = 1 and dh.dayName = ? and dh.doctorID = (SELECT DoctorID from 390db.patients p where id = ?);"
        db.query(state,[start,end, dayName,patID], (err, result) => {
            if (err) {
                console.log("Error: "+err);
            } else {
                console.log(result);
            }
        }    
        );
        state2 = "INSERT INTO 390db.appointments (PatientID,DoctorID,startTime,endTime,aptDate,dayName,Priority) VALUES(?,(SELECT DoctorID from 390db.patients p where id = ?),?,?,?,?,5);"
        
        db.query(state2,[patID,patID,start,end,aptDate,dayName], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(state2);
                res.send(result);
            }
        }
        
        );
        }

        if (err) {
            console.log("Error: "+err);
        } else {
            console.log(result);
        }
    }    
    );



    
}
)