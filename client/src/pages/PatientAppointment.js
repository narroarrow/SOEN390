import * as React from 'react';
import {useState, useEffect} from 'react';
import {Container, Box, FormLabel, RadioGroup, Radio, FormControl, FormControlLabel, CssBaseline, Button} from '@mui/material'
import Axios from 'axios';

function PatientAppointment() {

  function getNextDayOfTheWeek(dayName, excludeToday = true, refDate = new Date()) {
    const dayOfWeek = ["sun","mon","tue","wed","thu","fri","sat"]
                      .indexOf(dayName.slice(0,3).toLowerCase());
    if (dayOfWeek < 0) return;
    refDate.setHours(0,0,0,0);
    refDate.setDate(refDate.getDate() + +!!excludeToday + 
                    (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7);
    return refDate;
}

console.log("Next is: " + getNextDayOfTheWeek("Wednesday", false));

  //handles the changes in radio button clicked
  const [value, setValue] = React.useState('');
  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  //handling the submit and sending the approriate data to the server
  let submitSAppointmentForm = (event) =>{
    event.preventDefault();
    console.log(value);
    if(value != ''){
      Axios.post('http://localhost:8080/makeAppointments',{
        patientID: localStorage.getItem('id'),
        appointmentTime: value
      }, {withCredentials: true}).then(()=>{
        //printing success message
        alert("success");
      });
    }
    else{
      //this message will apper if no input was selected
      alert("Please select a valid appointment");
    }
    
  };

  //create an empty use state that will be used to store all the available appointments
  const [appointments, setAppointments] = useState([]);
  let stopeffect = 1;

  //This will automatically get the appointment slots available for the doctor to which the patient is assigned to
  useEffect(()=>{ 
    Axios.get("http://localhost:8080/seeOpenAppointments", {
      params: {
        id: localStorage.getItem('id')
      }
    }).then((response) => {
      setAppointments(response.data);
    });   
}, [stopeffect]); 


  //Looping throught the available time slots and adding them to a radio checklist
  let itemList=[];
  appointments.forEach((item,index)=>{
    itemList.push( 
  <FormControlLabel value={item} name={item} id={index} control={<Radio />} label={item} />
    )
  })
  
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    {/* Centering the form in the middle of the screen */}
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
      {/* Creatinf the form */}
      <form onSubmit={submitSAppointmentForm}>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="demo-error-radios">Book your appointment</FormLabel>
        <RadioGroup aria-labelledby="demo-error-radios" name="appointment" onChange={handleRadioChange}>
          {/* Displays all appointments options */}
          {itemList}
        </RadioGroup>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Submit
        </Button>
      </FormControl>
    </form>
      </Box>
    </Container>
  )
}
  export default PatientAppointment
