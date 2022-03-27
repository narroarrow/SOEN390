import { Paper, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup, TextField, Button, Stack, Checkbox } from '@mui/material';
import Axios from 'axios';
import { useState } from "react";
import React from 'react';
import { Navigate } from 'react-router-dom';

//This variable represents a function that will be called when the user 
//submits their Symptom Form. The data enterred will be sent to the 
//server.js file so that it can be stored in the database.
let submitSymptomForm = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  Axios.post('http://localhost:8080/createSymptomForm', {
    patientid: localStorage.getItem('id'),
    timestamp: Date.now(),
    weight: data.get('weight'),
    temperature: data.get('temperature'),
    breathing: data.get('breathing'),
    chest: data.get('chest'),
    fatigue: data.get('fatigue'),
    smell: data.get('smell'),
    fever: data.get('fever'),
    cough: data.get('cough'),
    taste: data.get('taste'),
    symptoms: data.get('symptoms'),
    urgent: data.get({urgent}),
  }).then(() => {
    console.log("success");
    window.location.href = "/PatientProfile";
  });
};

let urgent = false;

function FormRadio(label, radioId, radioName, labelBy) {

return(
<>
  <FormControl>
              <FormLabel sx={{ mb: 3 }}>
                {label}
              </FormLabel>

              <RadioGroup
                row
                aria-labelledby={labelBy}
                defaultValue="top"
                sx={{ mb: 5 }}
                id={radioId}
                name={radioName}
              >

                <FormControlLabel
                  value="1"
                  control={<Radio required={true} />}
                  label="1 (None)"
                  labelPlacement="top"
                  required
                />

                <FormControlLabel
                  value="2"
                  control={<Radio required={true} />}
                  label="2"
                  labelPlacement="top"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="3"
                  control={<Radio required={true} />}
                  label="3"
                  labelPlacement="top"
                  sx={{ mr: 3 }}
                />

                <FormControlLabel
                  value="4"
                  control={<Radio required={true} />}
                  label="4"
                  labelPlacement="top"
                />

                <FormControlLabel
                  value="5"
                  control={<Radio required={true} />}
                  label="5 (Extreme)"
                  labelPlacement="top"
                  sx={{ ml: 0.5 }}
                />

              </RadioGroup>
            </FormControl>
            </>
)
}



const handleChange = () => {

  if (!{urgent}){
      urgent = true;
  } else {
      urgent = false;
  }
};

function SymptomForm() {

  const storedLabels = ["Difficulty Breathing", "Chest Pain", "Fatigue", "Fever", "Cough", "Loss of Smell", "Loss of Taste"]
  const nameIDs = ["breathing", "chest", "fatigue", "fever", "cough", "smell", "taste"]


  let diffBreathing = FormRadio(storedLabels[0], nameIDs[0], nameIDs[0], nameIDs[0])
  let chestPain = FormRadio(storedLabels[1], nameIDs[1], nameIDs[1], nameIDs[1])
  let fatigue = FormRadio(storedLabels[2], nameIDs[2], nameIDs[2], nameIDs[2])
  let fever = FormRadio(storedLabels[3], nameIDs[3], nameIDs[3], nameIDs[3])
  let cough = FormRadio(storedLabels[4], nameIDs[4], nameIDs[4], nameIDs[4])
  let smell = FormRadio(storedLabels[5], nameIDs[5], nameIDs[5], nameIDs[5])
  let taste = FormRadio(storedLabels[6], nameIDs[6], nameIDs[6], nameIDs[6])

  return (

    <>
      {
        localStorage.getItem("role") != 'Patient' && <Navigate to={"/"} refresh={true} />
      }

      <div align="Center">
        <Paper elevation={24} component="form" onSubmit={submitSymptomForm} sx={{ width: 700, height: 2000, mt: 10 }}>
          <h1>Symptoms</h1>


          <FormControl>
            <FormLabel id="temperature" sx={{ mb: 3 }}>
              Please enter your temperature (in degrees Celsius)
            </FormLabel>
            <TextField id="temperature" name="temperature" required label="Temperature (°C)" variant="filled" type="number" inputProps={{ maxLength: 3 }} sx={{ mb: 5 }} />
          </FormControl>

          <br></br>

          <FormLabel id="weight" sx={{ mb: 3 }}>
            Please enter your weight (in kg)
          </FormLabel>

          <br></br>

          <FormControl >
            <TextField id="weight" name="weight" required label="Weight (kg)" variant="filled" type="number" inputProps={{ maxLength: 3 }} sx={{ mb: 5, width: 372 }} />
          </FormControl>

          <br></br>

          {diffBreathing}
          {chestPain}
          {fatigue}
          {fever}
          {cough}
          {smell}
          {taste}

      

          <div>
            <FormControl>
              <FormLabel id="symptoms" sx={{ mb: 3 }}>Any Additional Symptoms (Optional)?</FormLabel>
              <TextField
                id="symptoms"
                multiline
                rows={4}
                label="Enter Any Other Symptoms Here"
                variant="filled"
                name="symptoms"
                sx={{ width: 350 }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel sx={{ mb: 3 }} position="start">Urgent</FormLabel>
              <Checkbox id="urgent"  onChange={handleChange()}></Checkbox>
            </FormControl>
          </div>

          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit
          </Button>

        </Paper>

      </div>
    </>
  );
}

export default SymptomForm;
