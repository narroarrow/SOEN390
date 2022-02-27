import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import {Container, Typography, Box, Grid, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar, MenuItem} from '@mui/material'
import Axios from 'axios';

//all possible users
const roles = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Patient',
    label: 'Patient',
  },
  {
    value: 'Doctor',
    label: 'Doctor',
  },
  {
    value: 'Health Official',
    label: 'Health Official',
  },
  {
    value: 'Immigration Officer',
    label: 'Immigration Officer',
  },
];


//handling the Signup form
let submitSignupForm = (event) =>{
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  Axios.post('http://localhost:8080/Signup',{
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
 }).then(()=>{
   //will have user authentication here
   alert("success");
 });
};

function Signup() {
    //switching roles
  const [role, setRoles] = React.useState('Patient');

  const handleChange = (event) => {
    setRoles(event.target.value);
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOpenTwoToneIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={submitSignupForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="Phone Number" label="Phone Number" name="PhoneNumber" autoComplete="phone-number"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password"autoComplete="new-password"/>
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="confirmPassword" label="ConfirmPassword" type="password" id="Confirmpassword" autoComplete="new-password"/>
              </Grid>

              <Grid item xs={12}>
                <TextField center required id="role" select label="Select" value={role} onChange={handleChange} helperText="Please select your currency">
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              

            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Signup;