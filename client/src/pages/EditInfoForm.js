import Stack from '@mui/material/Stack'; import Paper from '@mui/material/Paper'; import React from 'react'; import FormControlLabel from '@mui/material/FormControlLabel'; import FormControl from '@mui/material/FormControl'; import FormLabel from '@mui/material/FormLabel'; import Radio from '@mui/material/Radio'; import RadioGroup from '@mui/material/RadioGroup'; import { TextField } from '@mui/material'; import Button from '@mui/material/Button'; import Axios from 'axios'; import { useState } from "react";

// let submitEditInfoForm = (event) =>{
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   const currentDate = new Date();
//   const timestamp = currentDate.getTime();
//    Axios.post('http://localhost:8080/createEditInfoForm',{
//       //patientid: id
//       timestamp: Date.now(),
//       weight: data.get('weight'),
//       temperature: data.get('weight'),
//       breathing: data.get('breathing'),
//       chest: data.get('chest'),
//       fatigue: data.get('fatigue'),
//       smell: data.get('smell'),
//       fever: data.get('fever'),
//       cough: data.get('cough'),
//       taste: data.get('taste'),
//       symptoms: data.get('symptoms'),
//  }).then(()=>{
//    console.log("success");
//  });
// };


function EditInfoForm() {

  return (
    <div align="Center">
    {/* ADD ON SUBMIT */}
    <Paper  elevation={24} component="form" sx={{width: 700, height:2000, mt:10}}>  
      <h1>Edit Profile Information</h1>


      <FormControl>
        <FormLabel id="firstName" sx={{mb:3}}>
          Please enter your first name
        </FormLabel>
        <TextField id="firstName" name="firstName" required label="First Name" variant="filled" type="text" inputProps={{ maxLength: 15 }} sx={{mb:5}}/>
      </FormControl>

      <br></br>

      <FormControl>
        <FormLabel id="lastName" sx={{mb:3}}>
          Please enter your last name
        </FormLabel>
        <TextField id="lastName" name="lastName" required label="Last Name" variant="filled" type="text" inputProps={{ maxLength: 15 }} sx={{mb:5}}/>
      </FormControl>

      <br></br>

      <FormControl>
        <FormLabel id="lastName" sx={{mb:3}}>
          Please enter your birthday
        </FormLabel>
    
        <Stack component="form" noValidate spacing={3}>
        <TextField id="date" label="Birthday" type="date" defaultValue="2022-02-24" sx={{ width: 220, textAlign: 'center' }} InputLabelProps={{ shrink: true,}}
      /></Stack>
      </FormControl>
      

      <br></br>


      <FormControl>
        <FormLabel id="patientHI" sx={{mb:3}}>
            Health Insurance Number
        </FormLabel>
        <TextField id="patientHI" name="patientHI" required label="Health Insurance" variant="filled" type="text" inputProps={{ maxLength: 10 }} sx={{mb:5}}/>
        </FormControl>

      <br></br>

        <FormControl>
        <FormLabel id="patientPhone" sx={{mb:3}}>
            Please enter your phone number
        </FormLabel>
        <TextField id="patientPhone" name="patientPhone" required label="Phone number" variant="filled" type="number" inputProps={{ maxLength: 9 }} sx={{mb:5}}/>
        </FormControl>

      <br></br>

      <FormControl>
        <FormLabel id="patientEmail" sx={{mb:3}}>
          Please enter your email address
        </FormLabel>
        <TextField id="patientEmail" name="patientEmail" required label="Email address" variant="filled" type="text" inputProps={{ maxLength: 240 }} sx={{mb:5}}/>
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


export default EditInfoForm;