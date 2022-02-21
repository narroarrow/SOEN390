import * as React from 'react';
import {Avatar, IconButton, Button, Box, Grid, CardHeader,} from '@mui/material';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function DoctorPatientProfile() {
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
        <Grid container spacing={5} columns={12}>
          {Array.from(Array(12)).map((_, index) => ( //array value is the number of patients
            <Grid item md={4} key={index}>
              <button>
                <CardHeader
                  avatar={
                    <Avatar aria-label="">
                      P{index}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label=""></IconButton>
                  }
                  title="Name of Patient" //name of patient from db
                  subheader="Status: Infected" //status of patient from db
                />
                <FlagIcon color = "secondary"/> {/* red flag (flagged) */}
                {/* <FlagOutlinedIcon/>  */} {/* outlined flag (not flagged) */}
                <VisibilityIcon/> {/* viewed icon */}
                {/* <VisibilityOutlinedIcon/> */} {/* unviewed icon */}

              </button>
            </Grid>
          ))}
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