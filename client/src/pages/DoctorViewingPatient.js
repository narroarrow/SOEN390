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


function DoctorViewingPatient() {
    const location = useLocation();
    const [patientData, setPatientData] = useState([]);

    let stopeffect = 1;
    
    useEffect(()=>{
        console.log("hello")
        Axios.get("http://localhost:8080/doctorViewingPatientData", { params: {id: location.state.ID}}).then((response) => {
            console.log('hello');
            setPatientData(response.data);
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
                {patientData.map((val, key) =>{ 
                    return(
                        <Grid container spacing={2} key={key}>
                            <Grid item xs={4}>
                                <Item>Patient Name: {val.Fname + " " + val.Lname}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Patient ID: {val.ID}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Covid-19 Status: {val.Status}</Item>
                            </Grid>
                            <br></br>
                            <Grid item xs={4}>
                                <Item>Doctor: {val.DoctorFirst + " " + val.DoctorLast}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Symptom: {val.Symptom}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Weight: {val.Weight}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Age: {val.Age}</Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>Gender: {val.gender}</Item>
                            </Grid>
                        </Grid>
                    )
                })}
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