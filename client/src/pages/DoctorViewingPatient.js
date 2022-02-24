import React from 'react';
import {Container, Box, Grid, CssBaseline, Button, Card, styled, Paper, formHelperTextClasses} from '@mui/material';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useEffect, useState} from 'react';


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    fontWeight: 'bold'
  }));

  let doctorViewingPatientData = () => {
    Axios.get('http://localhost:8080/doctorViewingPatientData',{
        //send the patient id here
    }).then((response) => {
        console.log(response);
    });
};



function DoctorViewingPatient() {
    const location = useLocation();
    
    
    const [patientData, setPatientData] = useState([]);
    let stopeffect=1;


    useEffect(() => {
        Axios.get('http://localhost:8080/doctorViewingPatientData', {
            id: location.state.ID
            
        }).then((response) => {
            setPatientData(response.data);
            console.log(response);
        });
    }, [stopeffect]);

    return (
        <div>
            <Container component="main">
                <CssBaseline />
                <Box sx={{padding:5}}>
                        
                <Card sx={{ maxWidth: 275, textAlign:'center'}}><h1>Patient Profile </h1></Card>
                </Box>
                <Container>
                    <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Item>Patient Name:</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Patient ID:</Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>Covid-19 Status:</Item>
                    </Grid>
                    <br></br>
                    <Grid item xs={4}>
                        <Item>Doctor:</Item>
                    </Grid>
                    </Grid>
                </Container>
              
                <Box sx={{padding:5}}>
              
                <Button variant="outlined" href="#outlined-buttons" href="/SymptomForm">
                    REQUEST SYMPTOM FORM
                </Button>
              
                <Button sx={{ml: 65}} variant="outlined" href="#outlined-buttons" href="/SymptomForm">
                    VIEW PREVIOUS SYMPTOM FORMS
                </Button>
              
                <Button sx={{ml:55}} variant="outlined" href="#outlined-buttons">
                    MARK AS REVIEWED
                </Button>
              
                </Box>
            </Container>
              
        </div>
    );

}


export default DoctorViewingPatient;