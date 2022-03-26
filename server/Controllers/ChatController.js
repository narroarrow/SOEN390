const express = require("express");
const db = require("../database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const app = require("../app.js");
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");


// Initialize io object that will be taking care or tracking users that open the website
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //This tells the socket which port the frontend is running on so it can track
        methods: ["GET","POST"], //Tells the socket which commands it will be receiving from the frontend
    },
});


io.on("connection", (socket) => { //This checks if a user opened thew website
    console.log(socket.id);

    socket.on("join_room", (roomid) => { //Server waits for client to connect
        socket.join(roomid);//Needs to be roomid
        console.log("Patient joined room: " + roomid);//Needs to be roomid
    });

    socket.on("send_message", (messageData) => {
        console.log("Correct Room ID: " + messageData.roomid);
        console.log("Patient That Send Message: " + messageData.patientid);
        console.log("Socket Message Emitted: " + messageData.message);

        socket.to(2).emit("receive_message",messageData); // The socket.listen on the frontend LiveChat.js page will catch this message since they are both using "receive_message".
    });

    socket.on("disconnect", () => { //Checks if a user has left the website. i.e closed the socket connection
        console.log("user disconnected");
    });
});

server.listen(5000, () => { //The socket server will eb running on a seperate port for now
    console.log("SERVER RUNNING");
})

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

ChatController.get("/patientLiveChatMessages", (req, res) => {
    let patientid = req.query["id"];
    // let doctorid = 35;

    //This query get all messages between a specific patient and doctor.
    //parameters: PatientID, DoctorID
    //returns:
    let state2 ="SELECT * FROM 390db.livechat LC WHERE LC.PatientID = ? ORDER BY LC.Timestamp";
    db.query(state2,
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

// ChatController.get("/doctorLiveChatMessages", (req, res) => {
//     let patientid = req.query["id"];
//     // let doctorid = 35;

//     //This query get all messages between a specific patient and doctor.
//     //parameters: PatientID, DoctorID
//     //returns:
//     let state ="SELECT * FROM 390db.livechat LC WHERE LC.PatientID = ? ORDER BY LC.Timestamp";
//     db.query(state,
//         [patientid],
//         (err, results) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send(results);
//             }
//         }
//     );
// });

/*This post method is called when a patient or doctor sends a message through the live chat*/
    ChatController.post("/createPatientLiveChatMessage", (req,res) => {
    let patientid = req.body.id;
    let doctorid;
    let roomid = 2;
    let timestamp = new Date();
    let message = req.body.message;
    let senderid = req.body.id;
    
    //Finds the patient's doctor id
    let state1 ="SELECT P.DoctorID FROM 390db.Patients P WHERE P.ID = ?";
    db.query(state1,
        [patientid],
        (err, results) => {
            if (err) {
                console.log(err);
                return;
            } else {// If we are able to find a doctor ID, then we begin inserting the message into the database
                doctorid = results[0]["DoctorID"];

                    //This query inserts a new message between a patient and doctor into the livechat table
                    //parameters: PatientID, DoctorID, SenderID, Timestamp
                    //returns:
                let state2 = "INSERT INTO 390db.livechat (PatientID, DoctorID, RoomID, Timestamp, Message, SenderID, Seen) VALUES (?,?,?,?,?,?,0)";
                db.query(state2,[patientid,doctorid,roomid,timestamp,message,senderid],
                    (err,results) =>
                    {
                        if(err){
                            console.log(err);
                        } else{
                            console.log("Message inserted!");
                        }
                    }
                    );
            }
        }
    );
    

});



// ChatController.post("/createDoctorLiveChatMessage", (req,res) => {
//     let patiendid = req.body.id;
//     let doctorid;
//     let roomid = 2;
//     let timestamp = new Date();
//     let message = req.body.message;
//     let senderid = req.body.id;
    
//     //Finds the patient's doctor id
//     let state1 ="SELECT P.DoctorID FROM 390db.Patients P WHERE P.ID = ?";
//     db.query(state1,
//         [patientid],
//         (err, results) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             } else {
//                 //res.send(results);
//                 doctorid = results[0]["DoctorID"];
//             }
//         }
//     );

//     //This query inserts a new message between a patient and doctor into the livechat table
//     //parameters: PatientID, DoctorID, SenderID, Timestamp
//     //returns:
//     let state = "INSERT INTO 390db.livechat (PatientID, DoctorID, RoomID, Timestamp, Message, SenderID, Seen) VALUES (?,?,?,?,?,?,0)";
//     db.query(state,[patiendid,doctorid,roomid,timestamp,message,senderid],
//         (err,results) =>
//         {
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log("Message inserted!");
//             }
//         }
//         );
// });

module.exports = ChatController;