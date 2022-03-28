const app = require('./app.js'),
server = require('http').createServer(app);
const {Server} = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //This tells the socket which port the frontend is running on so it can track
        methods: ["GET","POST"], //Tells the socket which commands it will be receiving from the frontend
    },
});

io.on("connection", (socket) => { //This checks if a user opened thew website
    //console.log(socket.id);
 
     socket.on("join_room", (roomid) => { //Server waits for client to connect
         
         var room = Number(roomid); //Convert the room id into a number
         socket.join(room);//Needs to be roomid
         console.log("User joined room: " + roomid);//Needs to be roomid
     });
 
     socket.on("send_message", (messageData) => {
         console.log("Correct Room ID: " + messageData.roomid);
         console.log("Patient That Sent Message: " + messageData.patientid);
         console.log("Socket Message Emitted: " + messageData.message);
 
         var room = Number(messageData.roomid); //Convert the room id into a number
         socket.to(room).emit("receive_message",messageData); // The socket.listen on the frontend LiveChat.js page will catch this message since they are both using "receive_message".
     });
 
     socket.on("disconnect", () => { //Checks if a user has left the website. i.e closed the socket connection
         console.log("user disconnected");
     });
 });

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));