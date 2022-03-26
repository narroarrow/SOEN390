const express = require("express");
const db = require("../database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const LiveChatController = express.Router()

LiveChatController.use(express.json());
LiveChatController.use(cookieParser());
LiveChatController.use(cors({credentials: true, origin: 'http://localhost:3000'}));
LiveChatController.use(express.static(path.join(__dirname, "../client/build")));
LiveChatController.use(express.static(__dirname + "../client/public/"));
LiveChatController.use(bodyParser.urlencoded({extended: true}));
LiveChatController.use(bodyParser.json())
LiveChatController.use(express.static('dist'));


LiveChatController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*This get method is called when the live chat between a patient and 
their doctor is opened. It is used to display
all previous messages*/
LiveChatController.get("/liveChatMessages", (req, res) => {
    let patientid = req.body.patientid;
    let doctorid = req.body.doctorid;

    if(doctorid.length == 0)
    {
        //This query get all messages between a specific patient and doctor. This is used when a patient is logged in.
        //parameters: PatientID
        //returns:
        let state1 ="SELECT LC.Message, LC.Timestamp, LC.SenderID FROM 390db.livechat LC WHERE LC.PatientID = ? ORDER BY LC.Timestamp";
        db.query(state1,
            [patientid],
            (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(results);
                }
            }
        );
    } else{

    //This query get all messages between a specific patient and doctor. This is used when a doctor is logged in.
    //parameters: PatientID, DoctorID
    //returns:
    let state2 ="SELECT LC.Message, LC.Timestamp, LC.SenderID FROM 390db.livechat LC WHERE LC.PatientID = ?, LC.DoctorID = ? ORDER BY LC.Timestamp";
    db.query(state2,
        [patientid, doctorid],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        }
    );
    }
});

/*This post method is called when a patient or doctor sends a message through the live chat*/
LiveChatController.post("/createLiveChatMessage", (req,res) => {
    let patiendid = req.body.patientid;
    let doctorid = req.body.doctorid;
    let roomid = req.body.roomid;
    let timestamp = req.body.timestamp;
    let message = req.body.message;
    let senderid = req.body.senderid;


    //This query inserts a new message between a patient and doctor into the livechat table
    //parameters: PatientID, DoctorID, SenderID, Timestamp
    //returns:
    let state = "INSERT INTO 390db.livechat (PatientID, DoctorID, RoomID, Timestamp, Message, SenderID, Seen) VALUES (?,?,?,?,?,?,0)";
    db.query(state,[patiendid,doctorid,roomid,timestamp,message,senderid],
        (err,results) =>
        {
            if(err){
                console.log(err);
            } else{
                console.log("Message inserted!");
            }
        }
        );
});

LiveChatController.get("/patientDoctorName", (req, res) => {
    let patientid = req.query.id;
    //This query is used in order to get the first name of both the patient and doctor using the patiendid as the passed value
    let state ="SELECT pat.FName AS patientName, doc.FName AS doctorName FROM 390db.patients p, 390db.users pat, 390db.users doc WHERE p.ID = ? AND p.ID = pat.ID AND p.DoctorID = doc.ID";
    db.query(state, [patientid],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
                console.log(results);
            }
        }
    );  
});



