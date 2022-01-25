import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { Link } from "react-router-dom";

function Signup() {
  return (
  <div>
      <h1>Signup page</h1>
      <p>Please fill in info</p>
      <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
        <TextField variant="filled" id="outlined-basic" label="Name"/>
        <br/>
        <TextField variant="filled" id="outlined-basic" label="Email"/>
        <br/>
        <TextField variant="filled" id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
        <br/>
        <TextField variant="filled" id="outlined-password-input" label="Confirm Password" type="password" autoComplete="current-password"/>
        <br/>
        <br/>
        <h4>Select Role</h4>
        <br/>
        <FormControl>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Patient" name="radio-buttons-group">
            <FormControlLabel value="Patient" control={<Radio />} label="Patient" />
            <FormControlLabel value="Doctor" control={<Radio />} label="Doctor" />
            <FormControlLabel value="Medical Official" control={<Radio />} label="Medical Official" />
            <FormControlLabel value="mmigration Officer" control={<Radio />} label="Immigration Officer" />
            <FormControlLabel value="Administrator" control={<Radio />} label="Administrator" />
          </RadioGroup>
        </FormControl>
        <br/>
        <br/>
        <Link to="/"><Button variant="contained">Submit</Button></Link>
        
      </Box>
  </div>
  );
}


export default Signup;