import * as React from 'react';
import {useState} from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import {Container, Typography, Box, Grid, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar, MenuItem, stepConnectorClasses} from '@mui/material'
import Axios from 'axios';
import validator from 'validator';

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
let userRoles = 'Patient';
let submitSignupForm = (event1) =>{
  event1.preventDefault();
  const data = new FormData(event1.currentTarget);
  if(validator.isEmail(data.get('email')) && validator.isStrongPassword(data.get('password')) && validator.isMobilePhone(data.get('PhoneNumber')) && data.get('password') == data.get('confirmPassword')){
    Axios.post('http://localhost:8080/Signup',{
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      userRole: userRoles,
      phoneNumber: data.get('PhoneNumber')
    }, {withCredentials: true}).then(()=>{
      //will have user authentication here
      alert("success");
    });
  }
  else{
    alert("Wrong information");
  }
  
};

function Signup() {
  //switching roles
  const [role, setRoles] = React.useState('Patient');

  const handleChange = (event2) => {
    setRoles(event2.target.value);
    userRoles = event2.target.value
  };

  //validating email
  const [emailError, setEmailError] = useState('');
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

    //validating phone number
    const [phoneError, setPhoneError] = useState('');
    const validatePhone = (e) => {
      var phone = e.target.value;
  
      if (validator.isMobilePhone(phone)) {
        setPhoneError('');
      } else {
        setPhoneError('Enter valid phone number!');
      }
    };

   //validating password
   const [passwordError, setpasswordError] = useState('');
   const validatePassword = (e) => {
     var passowrd = e.target.value;
 
     if (validator.isStrongPassword(passowrd)) {
      setpasswordError('');
     } else {
      setpasswordError('Enter valid Password!');
     }
   };

   //display password requirements.
   const [isPassword1Shown, setIsPassword1Shown] = useState(false);
   const [isPassword2Shown, setIsPassword2Shown] = useState(false);


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
                <TextField required fullWidth id="Phone Number" label="Phone Number" name="PhoneNumber" autoComplete="phone-number" onChange={(e) => validatePhone(e)}/>
                {phoneError}
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={(e) => validateEmail(e)}/>
                {emailError}
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" onChange={(e) => validatePassword(e)}
                onMouseEnter={() => setIsPassword1Shown(true)} onMouseLeave={() => setIsPassword1Shown(false)}/>
                {isPassword1Shown && (
                  <div>
                    min Length is 8, at least 1 lowercase, at least 1 Uppercase, at least 1 Numbers,at least 1 Symbols
                  </div>
                )}
                {passwordError}
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="Confirmpassword" autoComplete="new-password" onChange={(e) => validatePassword(e)}
                onMouseEnter={() => setIsPassword2Shown(true)} onMouseLeave={() => setIsPassword2Shown(false)}/>
                {isPassword2Shown && (
                  <div>
                    min Length is 8, at least 1 lowercase, at least 1 Uppercase, at least 1 Numbers, at least 1 Symbols
                  </div>
                )}
                {passwordError}
              </Grid>

              <Grid item xs={12}>
                <TextField center required name="UserRole" id="UserRole" select label="role" value={role} onChange={handleChange} helperText="Please select your role">
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