import * as React from 'react';
import {Avatar, IconButton, Button, Box, Grid, CardHeader,} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Axios from 'axios';
import { useState } from "react";

function DoctorPatientProfile() {
  const [patientList, setPatientList] = useState([]); //all patient info
  const [filteredPatients, setFilteredPatients] = useState([]); //filtered values for patient info
  const [executed, setExecuted] = useState(false); //keeps track of if getPatients() method is called

  var tempDoctorID = 1; //temp ID for doctor until login is implemented

  var myPatients = patientList.filter(e => e.DoctorID === tempDoctorID);
  var allPatients = patientList;

  const filterMyPatients = () => { //this function will set the useState filteredPatients to show ALL patients
    setFilteredPatients(myPatients)
  };

  const filterAllPatients = () => { //this function will set the useState filteredPatients to show the patients assigned specifically to the doctor who is logged in
    setFilteredPatients(allPatients)
  };

  const getPatients = () => { //this function is called when the doctor patient profile page is loaded. It sets the useState patientList to the query result for patient info
    Axios.get("http://localhost:8080/DoctorPatientProfile").then((response) => {
      setPatientList(response.data);
      if (!executed){
        setFilteredPatients(patientList);
        setExecuted(true);
      }
    }); 
  };
  

  return (
    <div>
      <Box sx={{ padding: 5 }}>
        <h1>Patient Profile Page (Doctor)
          <Button value='All Patients' name='All Patients' variant="outlined" href="#outlined-buttons" onClick={() => filterAllPatients()} sx={{ textAlign: 'right', right: 0, display: 'inline-block', float: 'right' }}>
            All Patients
          </Button>
          <Button value='My Patients' name='My Patients' variant="outlined" href="#outlined-buttons" onClick={() => filterMyPatients()} sx={{ textAlign: 'right', right: 10, display: 'inline-block', float: 'right' }}>
            My Patients
          </Button>
        </h1>
      </Box>
      <Box sx={{ flexGrow: 1 }} textAlign='center'>
        <Grid container spacing={5} columns={12} onLoad={getPatients()}>
          {filteredPatients.map((val, key) =>{
            let isFlagged = val.Flagged;
            return (
              <Grid item md={4} key={key}>
                <button>
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
                  
                  <VisibilityIcon/> {/* viewed icon */}
                  {/* <VisibilityOutlinedIcon/> */} {/* unviewed icon */}
                  {isFlagged ? (<FlagIcon color = "secondary"/>) : (<FlagOutlinedIcon/>)} {/* If a patient is flagged the flag icon will be red */}

                </button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box sx={{ padding: 10 }}>
        <Button variant="outlined" href="#outlined-buttons" sx={{ textAlign: 'right', position: 'absolute', right: '9%' }}>
          Review Medical Checklist
        </Button>
      </Box>
    </div>
  );
}

export default DoctorPatientProfile;