import { Paper, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, Button } from '@mui/material'; 
import React from 'react'; 
import Axios from 'axios';
import { Navigate } from 'react-router-dom';

//This variable represents a function that will be called when the user submits
//their form to change their status. It will post the data from the form to
//the server.js file so that the patient's information can be altered in
//the database.
let submitPatientCovidStatus = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  Axios.post('http://localhost:8080/createPatientCovidStatus', {
    patientid: localStorage.getItem('id'),
    status: data.get('covidStatus')
  }).then(() => {
    console.log('success');
    window.location.href="/PatientProfile";
  });
};

function PatientCovidStatus() {

  // Takes users input for Covid status, either selects: healthy, isolating, or infected.
  
  

  return (
    <>
      {
        localStorage.getItem("role") != 'Patient' && <Navigate to={"/"} refresh={true} />
      }
      
    <div align="Center">
      <Paper elevation={24} component="form" onSubmit={submitPatientCovidStatus} sx={{ width: 700, height: 500, mt: 10 }}>
        <h1>Covid Status</h1>

        <FormControl>
          <FormLabel id="covidStatus" sx={{ mb: 3 }}>
            Covid Status
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="covidStatus"
            name="covidStatus"
            defaultValue="top"
            sx={{ mb: 5 }}
          >
            <FormControlLabel
              value="Healthy"
              control={<Radio required={true} />}
              label="Healthy"
              labelPlacement="top"
            />

            <FormControlLabel
              value="Isolating"
              control={<Radio required={true} />}
              label="Isolating"
              labelPlacement="top"
            />

            <FormControlLabel
              value="Infected"
              control={<Radio required={true} />}
              label="Infected"
              labelPlacement="top"
              sx={{ ml: 0.5 }}
            />

          </RadioGroup>
        </FormControl>

        <br></br>

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>

      </Paper>

    </div>
    </>
  );
}

export default PatientCovidStatus;