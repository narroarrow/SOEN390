import { Container, Button, CardHeader, Avatar, IconButton, Typography } from '@mui/material';
import React from 'react';

function PatientProfile() {
  return (
  <div>    
      <CardHeader
        avatar={
          <Avatar aria-label="">
            
          </Avatar>
        }
        action={
          <IconButton aria-label="">
            
          </IconButton>
        }
        title="Admin Board"
        subheader="Name of Admin"
      />
    <Container maxWidth="sm">
    <Typography variant="body1" color="initial">This is my admin page</Typography> 
    <Button variant="text">ADMIN Button</Button>
    </Container>
{/*<Card sx={{ maxWidth: 275 }}><h1>Patient Profile </h1></Card>
      <Button variant="text">ADMIN Button</Button>  */}
     
</div>
  );
}


export default PatientProfile;