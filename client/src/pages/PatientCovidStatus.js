import Paper from '@mui/material/Paper'; import React from 'react'; import FormControlLabel from '@mui/material/FormControlLabel'; import FormControl from '@mui/material/FormControl'; import FormLabel from '@mui/material/FormLabel'; import Radio from '@mui/material/Radio'; import RadioGroup from '@mui/material/RadioGroup'; import { TextField } from '@mui/material'; import Button from '@mui/material/Button'; import Axios from 'axios'; import { useState } from "react";

let submitPatientCovidStatus = (event) =>{
  event.preventDefault();
  const data = new FormData(event.currentTarget);
   Axios.post('http://localhost:8080/createPatientCovidStatus',{
      //patientid: id
      status: data.get('covidStatus')
 }).then(()=>{
   console.log("success");
 });
};


function PatientCovidStatus() {

  return (
    <div align="Center">
    <Paper  elevation={24} component="form" onSubmit={submitPatientCovidStatus} sx={{width: 700, height:2000, mt:10}}> 
      <h1>Covid Status</h1>

      <FormControl>
        <FormLabel id="covidStatus" sx={{mb:3}}>
          Covid Status
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="covidStatus"
          name="covidStatus"
          defaultValue="top"
          sx={{mb:5}}
        >
          <FormControlLabel
            value="1"
            control={<Radio required={true} />} 
            label="1 (Healthy)"
            labelPlacement="top"
          />

          <FormControlLabel 
            value="2" 
            control={<Radio required={true} />} 
            label="2 (Isolating)" 
            labelPlacement="top"
          />

          <FormControlLabel 
            value="3" 
            control={<Radio required={true} />} 
            label="3 (Infected)" 
            labelPlacement="top"
            sx={{ml:0.5}}
          />

        </RadioGroup>
      </FormControl>

      <br></br>

      
      // href="/PatientProfile" add to button below

      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Submit
      </Button>

    </Paper>

  </div>
  );
}


export default PatientCovidStatus;