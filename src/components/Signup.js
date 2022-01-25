// import React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import RadioGroup from '@mui/material/RadioGroup';
// import Radio from '@mui/material/Radio';
// import { Link } from "react-router-dom";

// function Signup() {
//   return (
//   <div>
//       <h1>Signup page</h1>
//       <p>Please fill in info</p>
//       <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}noValidateautoComplete="off">
//         <TextField variant="filled" id="outlined-basic" label="Name"/>
//         <br/>
//         <TextField variant="filled" id="outlined-basic" label="Email"/>
//         <br/>
//         <TextField variant="filled" id="outlined-password-input" label="Password" type="password" autoComplete="current-password"/>
//         <br/>
//         <TextField variant="filled" id="outlined-password-input" label="Confirm Password" type="password" autoComplete="current-password"/>
//         <br/>
//         <br/>
//         <h4>Select Role</h4>
//         <br/>
//         <FormControl>
//           <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="Patient" name="radio-buttons-group">
//             <FormControlLabel value="Patient" control={<Radio />} label="Patient" />
//             <FormControlLabel value="Doctor" control={<Radio />} label="Doctor" />
//             <FormControlLabel value="Medical Official" control={<Radio />} label="Medical Official" />
//             <FormControlLabel value="mmigration Officer" control={<Radio />} label="Immigration Officer" />
//             <FormControlLabel value="Administrator" control={<Radio />} label="Administrator" />
//           </RadioGroup>
//         </FormControl>
//         <br/>
//         <br/>
//         <Link to="/"><Button variant="contained">Submit</Button></Link>
        
//       </Box>
//   </div>
//   );
// }


// export default Signup;


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
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