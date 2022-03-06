import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, CssBaseline, Button, Card, styled, Paper } from '@mui/material';
import Axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
}));

function PatientProfile() {

    //These variables are used to get the current patient's data.
    //The const allows us to store the data in a variable using useState()
    //and the stopeffect will make sure that our useEffect() will only 
    //run one time.
    const [patientData, setPatientData] = useState([]);
    let stopeffect = 1;

    //This useEffect() will run after the page renders. It will
    //get the patients data by using a get and going to the 
    //server.js file to execute the code to query for the data.
    useEffect(() => {
        Axios.get('http://localhost:8080/patientProfileData', {
            //send the patient id here
        }).then((response) => {
            setPatientData(response.data);
            console.log(response);
        })
    }, [stopeffect]);

    //User ID will have to be passed
    let requestChat = () => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/RequestChat").then(()=>{
            console.log("success");
            window.location.href="/PatientProfile";
            
        });
    }

    let isChatRequested = false; //variable to verify if patient profile has been viewed, to be used for disabling or enabling MARK AS READ button
    let isChatRequestedArray = patientData.map((val, key) => {return val.ChatRequested});
    if (isChatRequestedArray[0] === 1){ //if the PatientID is present in the list of Viewed Patients then set isViewed to true
        isChatRequested = true;
    }

    let chatGranted = false; //variable to verify if patient profile has been viewed, to be used for disabling or enabling MARK AS READ button
    let chatGrantedArray = patientData.map((val, key) => {return val.ChatPermission});
    if (chatGrantedArray[0] === 1){ //if the PatientID is present in the list of Viewed Patients then set isViewed to true
        chatGranted = true;
    }

    // Returning the HTML / CSS for the Patient Profile
    // Each GRID ITEM retrieves patient data from the database
    // and displays it.
    // Each button on the page brings you to the associated pages
    return (
        <div>
            <Container component="main">
                <CssBaseline />
                <Box sx={{ padding: 5 }}>

                    <Card sx={{ maxWidth: 275, textAlign: 'center' }}><h1>Patient Profile </h1></Card>
                </Box>
                <Container>
                    Medical Information
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Item>Name:
                                {patientData.map((val, key) => {
                                    return " " + val.FName + " " + val.LName
                                })}
                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Patient ID:
                                {patientData.map((val, key) => {
                                    return " " + val.ID
                                })}
                            </Item>

                        </Grid>
                        <Grid item xs={4}>
                            <Item>Doctor:
                                {patientData.map((val, key) => {
                                    return " " + val.DFName + " " + val.DLName
                                })}

                            </Item>
                        </Grid>
                        <br></br>

                    </Grid>
                </Container>

                <Container sx={{ paddingTop: 5 }}>
                    General Patient Information
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <Item>Birthdate:
                                {patientData.map((val, key) => {
                                    return " " + val.Birthday
                                })}

                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Health Insurance:

                                {patientData.map((val, key) => {
                                    return " " + val.HealthInsurance
                                })}

                            </Item>
                        </Grid>
                        <br></br>

                        <Grid item xs={4}>
                            <Item>Phone number:
                                {patientData.map((val, key) => {
                                    return " " + val.Phone
                                })}
                            </Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Email Address:
                                {patientData.map((val, key) => {
                                    return " " + val.Email
                                })}
                            </Item>
                        </Grid>
                    </Grid>
                </Container>

                <Box sx={{ padding: 5, textAlign: "center" }}>

                    <Button sx={{ mr: 10 }} variant="outlined" href="/EditInfoForm" >
                        EDIT INFO
                    </Button>

                    <Button sx={{ mr: 10 }} variant="outlined" href="/PatientCovidStatus" >
                        Edit CURRENT STATUS
                    </Button>

                    <Button sx={{ mr: 10 }} variant="outlined" href="#outlined-buttons" href="/SymptomForm">
                        SYMPTOM FORM
                    </Button>

                    <Button sx={{}} variant="outlined" href="#outlined-buttons" >
                        BOOK APPOINTMENT
                    </Button>

                    {isChatRequested ?  (<Button sx={{}} variant="outlined" disabled>CHAT REQUESTED</Button>): 
                                        (<Button sx={{}} variant="outlined" onClick={requestChat}>REQUEST CHAT</Button>) }

                    {chatGranted ?      (<Button sx={{}} variant="outlined">CHAT</Button>) : 
                                        (<Button sx={{}} variant="outlined" disabled>CHAT</Button>)}

                </Box>
            </Container>

        </div>
    );
}

export default PatientProfile;