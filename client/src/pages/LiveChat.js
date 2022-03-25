import { Container, Box, Grid, CssBaseline, Button, styled, Paper, Typography, Divider, List, ListItem, ListItemText, FormControl, TextField, IconButton } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { ChatMessageDto } from '../components/ChatMessageDto';
import '../components/Chat.css';
import SendIcon from '@mui/icons-material/Send'


function LiveChat() {
    const ENTERCODE = 13;
    const webSocket = useRef(null);
    const scrollBottomRef = useRef(null);
    const [chatMessages, setChatMessages] = useState([
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'),
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'),
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello'), 
        new ChatMessageDto('Alex', 'Hello')   
    ]); 

    

    const [user, setUser] = useState("") 
    const [message, setMessage] = useState("") 

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

    const sendMessage = () => {
        // if(user&& message){
        //     console.log('Send')
        //     webSocket.current.send(
        //         JSON.stringify(new ChatMessageDto(user, message))
        //     );
            setMessage('');
        // }
    }

    const listChatMessages = chatMessages.map((ChatMessageDto, index) =>
        <ListItem key={index}>
            <ListItemText primary={`${ChatMessageDto.user}: ${ChatMessageDto.message}`}/>
        </ListItem> 
    );
    return (
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
                            <Grid xs={2} item>
                                <FormControl fullWidth>
                                    <TextField onChange={handleUserChange} label="Nickname" variant='outlined' value={user}/>
                                </FormControl>
                            </Grid>
                            <Grid xs={9} item>
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
    )
}
export default LiveChat;