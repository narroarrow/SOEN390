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

    //This query get all messages between a specific patient and doctor.
    //parameters: PatientID, DoctorID
    //returns:
    let state ="SELECT LC.Message, LC.Timestamp, LC.SenderID FROM 390db.livechat LC WHERE LC.PatientID = ?, LC.DoctorID = ? ORDER BY LC.Timestamp";
    db.query(state,
        [patientid, doctorid],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        }
    );
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



