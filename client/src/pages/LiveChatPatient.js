import { Container, Box, Grid, CssBaseline, Button, Chip, Paper, Typography, Divider, List, ListItem, ListItemText, FormControl, TextField, IconButton } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import '../components/Chat.css';
import SendIcon from '@mui/icons-material/Send'
import { Navigate } from "react-router-dom";
import Axios from 'axios';
import io from 'socket.io-client';


const socket = io.connect("http://localhost:5069");


function LiveChat() {
    const ENTERCODE = 13;
    let stopEffect = 1;
    let stopEffect2 = 1;
    const webSocket = useRef(null);
    const scrollBottomRef = useRef(null);

    

    const [patient, setPatient] = useState("Patient's Name") 
    const [doctor, setDoctor] = useState("Doctor's Name") 
    const [message, setMessage] = useState("") 
    const [allMessages, setAllMessages] = useState([]);
    const [patientid, setPatientID] = useState("");
    const [roomid, setRoomID] = useState("");

    useEffect(() => {
        if(scrollBottomRef.current){
            scrollBottomRef.current.scrollIntoView({behavior: 'auto'})
        }
    })

     useEffect(() => {
        Axios.get('http://localhost:8080/patientDoctorName', { withCredentials: true,
        params: { id: localStorage.getItem('id') } 
    }).then((response) => {
            setPatient(response.data[0].patientName);
            setDoctor(response.data[0].doctorName);
        })
    }, [stopEffect2]);

    useEffect(() => {
        Axios.get('http://localhost:8080/patientLiveChatMessages', { withCredentials: true, 
        params: { id: localStorage.getItem('id') } 
    }).then((response) => {
            setAllMessages(response.data);
            console.log(response);
        })
    }, [stopEffect]);

    //On render we store either the patient or doctor's id.
    useEffect(() => {
        if(localStorage.getItem("role") == "Patient"){
            setPatientID(localStorage.getItem("id"));
            console.log("Patient ID: " + localStorage.getItem("id"));
            setRoomID(patientid);
            joinRoom(); //This will put the patient in a room so only their doctor can join
        }

    }, [stopEffect]);

     //This useEffect is for receiving messages from the server. NOTE: Only patients in the room that is sending messages will receive them (implemented in the backend).
     useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("I AM RECEIVING THE MESSAGE: " + data.message);
            window.location.reload(false);
        })
    }, [socket]);

    const joinRoom = () => {

        if(localStorage.getItem("id") !== ""){
            console.log("Testing");
            socket.emit("join_room", localStorage.getItem("id")); 
        }
    }


    const handleMessgaeChange = (event) => {
        setMessage(event.target.value)
    }
    
    const handleEnterKey = (event) => {
        if(event.keyCode === ENTERCODE){
            sendMessage();
        }
    }

    const sendMessage = async () => {
        //Message sent by the patient is inserted into the database
        Axios.post("http://localhost:8080/createPatientLiveChatMessage", {
            id: localStorage.getItem('id'), //Pass the patient's id and message to the backend
            message: message 

        }).then(() => {
            console.log("success");
            window.location.href = "/PatientProfile";

        });
            const messageData = {
                roomid: localStorage.getItem('id'),
                patientid: localStorage.getItem('id'),
                message: message
            }
            await socket.emit("send_message", messageData);
            setMessage('');
            window.location.reload(false);

    }



    const showMessage = (event) => {
        console.log(event)
        alert(event.target.innerText);
      };

    // let splitMessage=[];
    let listChatMessages = [];
    // let MessageSplit = [];
    allMessages.forEach((item, index) => {
    //     splitMessage=item.Message.match(/.{1,65}/g);
        
    //     splitMessage.forEach((element) => {
    //         MessageSplit.push(
    //             <div>{element}</div>
    //         )
    //     });
        // console.log(splitMessage);
        listChatMessages.push(
        // <ListItem key={index} justify="flex-end">
        //     {(item.SenderID == item.PatientID) ?
        //     (<ListItemText/>):(<span></span>)}
        //     {(item.SenderID == item.PatientID) ?
        //     (<Chip key={Math.random()} sx={{ maxWidth: 1/1, height: 'auto'}} label={(
        //         <section>
        //             {MessageSplit}
        //         </section>
        //     )} color="primary"/>):
        //     (<Chip sx={{ maxWidth: 1/1, height: 'auto'+4}} variant="outlined" label={`${item.Message}`} color="primary"/>)}
        // </ListItem> 
         <ListItem key={index} justify="flex-end">
         {(item.SenderID == item.PatientID) ?
         (<ListItemText/>):(<span></span>)}
         {(item.SenderID == item.PatientID) ?
         (<Chip sx={{ maxWidth: 1/1, height: 'auto'+4}} label={`${item.Message}`} color="primary" onClick={showMessage}/>):
         (<Chip sx={{ maxWidth: 1/1, height: 'auto'+4}} variant="outlined" label={`${item.Message}`} onClick={showMessage} color="primary"/>)}
     </ListItem> 
        )
        // MessageSplit=[];
    })


    return (
        <>
        {
            localStorage.getItem("role") != 'Patient' && <Navigate to={"/"} refresh={true} />
        }
        <div>
            <Container>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant='h6' gutterBottom>
                            Live Chat with: {doctor}
                        </Typography>
                        <Divider />
                        <Grid container spacing={4} alignItems="center">
                            <Grid id="chat-window" xs={12} item>
                                <List id="chat-messages">
                                    {listChatMessages}
                                    <ListItem ref={scrollBottomRef}></ListItem>
                                </List>
                            </Grid>
                            <Grid xs={1} item>
                                <Typography variant='subtitle1'>
                                    {patient}   
                                </Typography>  
                            </Grid>
                            <Grid xs={10} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleMessgaeChange} onKeyDown={handleEnterKey} label="Type your message" variant='outlined' value={message}/>
                                </FormControl>
                            </Grid>
                            <Grid xs={1} item>
                                <IconButton aria-label="send" color="primary" onClick={sendMessage}>
                                    <SendIcon/>
                                </IconButton>
                            </Grid>

                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </div>
        </>
    )
}
export default LiveChat;