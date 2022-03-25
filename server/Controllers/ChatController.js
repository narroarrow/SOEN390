const express = require("express");
const db = require("../database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");

const ChatController = express.Router()

ChatController.use(express.json());
ChatController.use(cookieParser());
ChatController.use(cors({credentials: true, origin: 'http://localhost:3000'}));
ChatController.use(express.static(path.join(__dirname, "../client/build")));
ChatController.use(express.static(__dirname + "../client/public/"));
ChatController.use(bodyParser.urlencoded({extended: true}));
ChatController.use(bodyParser.json())
ChatController.use(express.static('dist'));


ChatController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Sets ChatRequested attribute in the patient table to 1
ChatController.post("/RequestChat", (req, res) => {
    let patientID = req.body.patientid; //this PatientID is used in the query to specify which patient tuple to edit
    //parameters: ID
    //returns:
    state = "UPDATE 390db.patients SET ChatRequested=1 WHERE ID=?"
    db.query(state,
        [patientID],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Chat Requested!");
            }
        }
    );
});

//Sets the ChatPermission attribute in the patient table to 1 and ChatRequested attribute to 0
ChatController.post("/acceptChat", (req, res) => {
    let patientID = req.body.PatientID; //this PatientID is used in the query to specify which patient tuple to edit
    //parameters: ID
    //returns:
    state = "UPDATE 390db.patients SET ChatRequested=false WHERE ID=?"
    db.query(state, [patientID],
        (err, results) => {
            if (err) {
                console.log(err);
            }
        }
    );
    state2 = "UPDATE 390db.patients SET ChatPermission=true WHERE ID=?"
    //parameters: ID
    //returns:
    db.query(state2, [patientID],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Chat accepted");
                res.send("Chat Accepted!");
            }
        }
    );
});

ChatController.get("/liveChatMessages", (req, res) => {
    let patientid = req.query["id"];
    // let doctorid = 35;

    //This query get all messages between a specific patient and doctor.
    //parameters: PatientID, DoctorID
    //returns:
    let state ="SELECT * FROM 390db.livechat LC WHERE LC.PatientID = ? ORDER BY LC.Timestamp";
    db.query(state,
        [patientid],
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
    ChatController.post("/createLiveChatMessage", (req,res) => {
    let patiendid = req.body.id;
    let doctorid = 35;
    let roomid = 1;
    let timestamp = new Date();
    let message = req.body.message;
    let senderid = req.body.id;


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

module.exports = ChatController;