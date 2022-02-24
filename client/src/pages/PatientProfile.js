import React, { useState, map, useEffect } from 'react';
import { Container, Box, Grid, CssBaseline, Button, Card, styled, Paper } from '@mui/material';
import Axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
}));




//how to make this run as the page opens instead of using a button?
// let patientProfileData = () => {
//     Axios.get('http://localhost:8080/patientProfileData',{
//         //send the patient id here
//     }).then((response) => {
//         console.log(response);
//     });
// };


function PatientProfile() {

    const [patientData, setPatientData] = useState([]);
    let stopeffect=1;


    useEffect(() => {
        Axios.get('http://localhost:8080/patientProfileData', {
            //send the patient id here
        }).then((response) => {
            setPatientData(response.data);
            console.log(response);
        });
    }, [stopeffect]);

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
                            <Item>Patient ID:</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Doctor:</Item>
                        </Grid>
                        <br></br>

                    </Grid>
                </Container>

                <Container sx={{ paddingTop: 5 }}>
                    General Patient Information
                    <Grid container spacing={2}>

                        <Grid item xs={4}>
                            <Item>Birthdate:</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Health Insurance:</Item>
                        </Grid>
                        <br></br>

                        <Grid item xs={4}>
                            <Item>Phone number:</Item>
                        </Grid>
                        <Grid item xs={4}>
                            <Item>Email Address:</Item>
                        </Grid>
                    </Grid>
                </Container>

                <Box sx={{ padding: 5 }}>

                    <Button sx={{ mr: 42 }} variant="outlined" href="/EditInfoForm" >
                        EDIT INFO
                    </Button>

                    <Button variant="outlined" href="#outlined-buttons" href="/SymptomForm">
                        SYMPTOM FORM
                    </Button>

                    <Button sx={{ ml: 32 }} variant="outlined" href="#outlined-buttons" >
                        BOOK APPOINTMENT
                    </Button>

                    <br></br>

                <Button sx={{ml:32}} variant="outlined" href="#outlined-buttons" >
                    FLAG PATIENT
                </Button>

                <Button sx={{ml:32}} variant="outlined" href="#outlined-buttons" >
                    UNFLAG PATIENT
                </Button>


<<<<<<< HEAD
                <Button sx={{mt:2, ml:53}} variant="outlined" href="/PatientCovidStatus" >
                    Edit CURRENT STATUS
                </Button>
=======
                    <Button sx={{ mt: 2, ml: 53 }} variant="outlined" href="/SymptomForm" >
                        Edit CURRENT STATUS
                    </Button>
>>>>>>> 60cbfd47e985c95e9b58df45dc508da941f249d6
                </Box>
            </Container>

        </div>
    );
}


export default PatientProfile;