import * as React from 'react';
import {Avatar, IconButton, Button, Box, Grid, CardHeader,} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Axios from 'axios';
import { useState } from "react";

function DoctorPatientProfile() {
  const [patientList, setPatientList] = useState([]);

  const getPatients = () => {
    Axios.get("http://localhost:8080/DoctorPatientProfile").then((response) => {
      setPatientList(response.data)
    });
  };

  return (
    <div>
      <Box sx={{ padding: 5 }}>
        <h1>Patient Profile Page (Doctor)
          <Button variant="outlined" href="#outlined-buttons" sx={{ textAlign: 'right', position: 'absolute', right: '10%' }}>
            Filter
          </Button>
        </h1>
      </Box>
      <Box sx={{ flexGrow: 1 }} textAlign='center'>
        <Grid container spacing={5} columns={12} onLoad={getPatients()}>
          {patientList.map((val, key) =>{
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