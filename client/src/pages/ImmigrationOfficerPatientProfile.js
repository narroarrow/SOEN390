import * as React from 'react';
import {Avatar, IconButton, Button, Box, Grid, CardHeader,} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';


function ImmigrationOfficerPatientProfile() {
  const [patientList, setPatientList] = useState([]); //all patient info
  const [filteredPatients, setFilteredPatients] = useState([]); //filtered values for patient info
  const [executed, setExecuted] = useState(false); //keeps track of if getPatients() method is called
  const [viewedList, setViewedList] = useState([]); //Patients whose profiles have been reviewed by a doctor
  
  var allPatients = patientList;

  const filterAllPatients = () => { //this function will set the useState filteredPatients to show the patients assigned specifically to the doctor who is logged in
    setFilteredPatients(allPatients)
  };

  function getPatients()  { //this function is called when the doctor patient profile page is loaded. It sets the useState patientList to the query result for patient info
    Axios.get("http://localhost:8080/DoctorPatientProfile").then((response) => {
      setPatientList(response.data);
      console.log(patientList);
      if (!executed){
        setFilteredPatients(response.data);
        setExecuted(true);
      }
    });  
  };

  const getViewed = () => { //this function is called when the doctor patient profile page is loaded. It sets the useState patientList to the query result for patient info
    Axios.get("http://localhost:8080/Viewed").then((response) => {
      setViewedList(response.data);
    });  
  };
  
  let stopeffect = 1;

  useEffect(()=>{
    getPatients();
    getViewed();
  }, [stopeffect]); 

  return (
    <div>
      <Box sx={{ padding: 5 }}>
        <h1>Patient Profile Page (Immigration Officer)
          <Button value='All Patients' name='All Patients' variant='outlined' href='#outlined-buttons' onClick={() => filterAllPatients()} sx={{ textAlign: 'right', right: 0, display: 'inline-block', float: 'right' }}>
            All Patients
          </Button>
        </h1>
      </Box>
      <Box sx={{ flexGrow: 1 }} textAlign='center'>
        <Grid container spacing={5} columns={12}>
          {filteredPatients.map((val, key) =>{
            let isFlagged = val.Flagged; //checks if patient has been flagged
            let isViewed = false; //patient health information is not viewed unless doctor specifies
            if (viewedList.map(el => el.ID).includes(val.ID)){ //if the PatientID is present in the list of Viewed Patients then set isViewed to true
              isViewed = true;
            }
            return (
              <Grid item md={4} key={key}>
                  <Link to='/HealthOfficialViewingPatient' state={{ID: val.ID}} style={{textDecoration: 'none'}}>
                  <Button variant='outlined' href='/HealthOfficialViewingPatient'>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="">
                          P{key}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label=""></IconButton>
                      }
                      title= {val.Fname + " " + val.Lname} //name of patient from db
                      subheader= {val.Status} //status of patient from db
                    />
                                
                    {isViewed ? (<VisibilityIcon/>) : (<VisibilityOutlinedIcon/>)} {/* If a patients health information has been reviewed the eye icon will be filled */}
                    {isFlagged ? (<FlagIcon color = 'secondary'/>) : (<FlagOutlinedIcon/>)} {/* If a patient is flagged the flag icon will be red */}

                  </Button>
                  </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ padding: 10 }}>
        <Button variant='outlined' href='#outlined-buttons' sx={{ textAlign: 'right', position: 'absolute', right: '9%' }}>
          Review Medical Checklist
        </Button>
      </Box>
    </div>
  );
}

export default ImmigrationOfficerPatientProfile;