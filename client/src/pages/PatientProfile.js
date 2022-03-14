import React, { useState, useEffect } from 'react';
import { Container, Box, Grid, CssBaseline, Button, Card, styled, Paper, Typography, TextField } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";

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
        Axios.get('http://localhost:8080/patientProfileData', { withCredentials: true, params: { id: localStorage.getItem('id') } }).then((response) => {
            setPatientData(response.data);
            console.log(response);
        })
    }, [stopeffect]);

    let requestChat = () => { //When clicking the REQUEST CHAT button, this will update the ChatRequested attribute in the patient tale to true
        Axios.post("http://localhost:8080/RequestChat", {
            patientid: localStorage.getItem('id')
        }).then(() => {
            console.log("success");
            window.location.href = "/PatientProfile";

        });
    }

    let isChatRequested = false; //variable to verify if patient has requested to chat, to be used for disabling or enabling REQUEST CHAT button
    let isChatRequestedArray = patientData.map((val, key) => { return val.ChatRequested });
    if (isChatRequestedArray[0] === 1) {
        isChatRequested = true;
    }



    let chatGranted = false; //variable to verify if patient has permission to chat with doctor, to be used for disabling or enabling OPEN CHAT button
    let chatGrantedArray = patientData.map((val, key) => { return val.ChatPermission });
    if (chatGrantedArray[0] === 1) {
        chatGranted = true;
    }

    // Returning the HTML / CSS for the Patient Profile
    // Each GRID ITEM retrieves patient data from the database
    // and displays it.
    // Each button on the page brings you to the associated pages
    return (
        <>
            {
                localStorage.getItem("role") != 'Patient' && <Navigate to={"/"} refresh={true} />
            }

            <Container component="main" >
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Typography component="h1" variant="h2">
                        Patient Profile
                    </Typography>
                    <Box sx={{ mt: 15 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
                                <Typography component="h1" variant="h5">
                                    Medical Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Name:<br/> {patientData.map((val, key) => {return " " + val.FName + " " + val.LName})}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Patient ID:<br/>{patientData.map((val, key) => {return " " + val.ID})}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Doctor:<br/>{patientData.map((val, key) => {return " " + val.DFName + " " + val.DLName})}
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 7 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
                                <Typography component="h1" variant="h5">
                                    General Patient Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Birthdate:<br/>{patientData.map((val, key) => {return " " + val.Birthday})}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Health Insurance:<br/> {patientData.map((val, key) => {return " " + val.HealthInsurance})}
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Item>
                                    Email Address:<br/>{patientData.map((val, key) => {return " " + val.Email})}
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 10 }}>
                        <Grid container fullwidth spacing={1}>
                            
                                <Button  xs={12} sm={3} sx={{margin: 1}} variant="contained" href="/EditInfoForm" >
                                    EDIT INFO
                                </Button>
                                
                                <Button xs={12} sm={3} sx={{margin: 1}} variant="contained"  href="/PatientCovidStatus" >
                                    Edit CURRENT STATUS
                                </Button>

                                <Button xs={12} sm={3} sx={{margin: 1}} variant="contained"  href="/SymptomForm">
                                    SYMPTOM FORM
                                </Button>
                            

                        </Grid>
                    </Box>
                    <Box sx={{ mt: 1 }}>
                        <Grid container fullwidth spacing={1}>
                            
                                <Button xs={12} sm={3} sx={{margin: 1}} variant="contained"  href="/PatientAppointment" >
                                    BOOK APPOINTMENT
                                </Button>

                                {isChatRequested ? (<Button xs={12} sm={3} sx={{margin: 1}} variant="contained"disabled>CHAT REQUESTED</Button>) :
                                (<Button xs={12} sm={3} sx={{margin: 1}} variant="contained"onClick={requestChat} >REQUEST CHAT</Button>)}

                                {chatGranted ? (<Button xs={12} sm={3} sx={{margin: 1}} variant="contained">OPEN CHAT</Button>) :
                                (<Button xs={12} sm={3} sx={{margin: 1}} variant="contained" disabled> OPEN CHAT</Button>)}

                        </Grid>
                    </Box>
                    
                </Box>
            </Container>
            <br/><br/>

{/* 
            <br/><br/><br/><br/><br/><br/><br/>
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

                        <Button sx={{ mr: 10 }} variant="outlined" href="/SymptomForm">
                            SYMPTOM FORM
                        </Button>

                        <Button sx={{}} variant="outlined" href="/PatientAppointment" >
                            BOOK APPOINTMENT
                        </Button>

                        <br></br><br></br>

                        {isChatRequested ? (<Button sx={{ mr: 22 }} variant="outlined" disabled>CHAT REQUESTED</Button>) :
                            (<Button sx={{ mr: 22 }} variant="outlined" onClick={requestChat} >REQUEST CHAT</Button>)}

                        {chatGranted ? (<Button sx={{}} variant="outlined">OPEN CHAT</Button>) :
                            (<Button sx={{}} variant="outlined" disabled> OPEN CHAT</Button>)}

                    </Box>
                </Container>

            </div> */}
        </>
    );
}

export default PatientProfile;