import { Container, Box, Grid, CssBaseline, Button, styled, Paper, Typography, Divider, List, ListItem, ListItemText, FormControl, TextField, IconButton } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { ChatMessageDto } from '../components/ChatMessageDto';
import '../components/Chat.css';
import SendIcon from '@mui/icons-material/Send'
import { Navigate } from "react-router-dom";
import Axios from 'axios';
import io from 'socket.io-client';


const socket = io.connect("http://localhost:5000");

function LiveChat() {

    const ENTERCODE = 13;
    let stopEffect = 1;
    const webSocket = useRef(null);
    const scrollBottomRef = useRef(null);
    // const [chatMessages, setChatMessages] = useState([
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'),
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'),
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello'), 
        // new ChatMessageDto('Alex', 'Hello')   
    // ]); 

    

    const [user, setUser] = useState("") 
    const [message, setMessage] = useState("") 
    const [allMessages, setAllMessages] = useState([]);
    const [patientid, setPatientID] = useState("");
    const [roomid, setRoomID] = useState("");
    


    // useEffect(() => {
    //     console.log("open web socket");
    //     webSocket.current = new WebSocket('*****PUT HOST HERE******')
    //     webSocket.current.onopen = (event) => {
    //         console.log("open: ", event)
    //     }
    //     webSocket.current.onclose = (event) => {
    //         console.log("close: ", event)
    //     }
    //     return () => {
    //         console.log("Closing websocket")
    //         webSocket.current.close();
    //     }
    // }, [])

    useEffect(() => {
    //     webSocket.current.onmessage = (event) => {
    //         const chatMssageDto = JSON.parse(event.data);
    //         console.log('Message: ', chatMssageDto);
    //         setChatMessages([...chatMessages, {
    //             user: chatMessageDto.user,
    //             message: chatMessageDto.message
    //         }]);
                if(scrollBottomRef.current){
                    scrollBottomRef.current.scrollIntoView({behavior: 'smooth'})
                }
    //     }
    })

    //Gets Patient's live chat messages
    useEffect(() => {
        Axios.get('http://localhost:8080/patientLiveChatMessages', { withCredentials: true, 
        params: { id: localStorage.getItem('id') } 
    }).then((response) => {
            setAllMessages(response.data);
            console.log(response.data);
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
        })
    }, [socket]);

    const joinRoom = () => {

        if(localStorage.getItem("id") !== ""){
            console.log("Testing");
            socket.emit("join_room", localStorage.getItem("id")); 
        }
    }

    const handleUserChange = (event) => {
        setUser(event.target.value)
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

    }


    let listChatMessages = [];
    allMessages.forEach((item, index) => {
        listChatMessages.push(
        <ListItem key={index}>
            <ListItemText primary={`${item.SenderID}: ${item.Message}`}/>
        </ListItem> 
        )
    })


    // const listChatMessages = allMessages.map((ChatMessageDto, index) =>
    //     <ListItem key={index}>
    //         <ListItemText primary={`${ChatMessageDto.user}: ${ChatMessageDto.message}`}/>
    //     </ListItem> 
    // );
    return (
        <>
        {
          !(localStorage.getItem("role") == 'Doctor' || localStorage.getItem("role") == 'Patient')  && <Navigate to={"/"} refresh={true} />
        }
        <div>
            <Container>
                <Paper elevation={5}>
                    <Box p={3}>
                        <Typography variant='h4' gutterBottom>
                            Live Chat
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
                                <Typography variant='h6'>
                                    Alex:    
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