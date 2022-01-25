import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { Link } from "react-router-dom";

function Login() {
  return (
  <div>
      <h1>Login Page</h1>
      <p>Please log in your account</p>
      <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
        <TextField variant="filled" id="outlined-basic" label="Email"/>
        <br/>
        <TextField variant="filled" id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
        
        
        <Link to="/"><Button variant="contained">Login</Button></Link>
      </Box>
      
      
  </div>
  );
}


export default Login;