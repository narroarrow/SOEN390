import { Card, Container } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

function PatientProfile() {
  return (
  <div>
      
      <Card sx={{ maxWidth: 275 }}><h1>Patient Profile </h1></Card>
      <Button variant="text">ADMIN Button</Button>
  </div>
  );
}


export default PatientProfile;