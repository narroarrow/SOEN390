import { Container, Button, CardHeader, Avatar, IconButton, Typography } from '@mui/material';
import React from 'react';

function AdminDashboard() {
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

     
  </div>
  );
}


export default AdminDashboard;