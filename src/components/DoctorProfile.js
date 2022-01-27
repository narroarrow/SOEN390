import { Card, Container } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

function DoctorProfile() {
  return (
  <div>
      
      <Card sx={{ maxWidth: 275 }}><h1>Doc </h1></Card>
      <Button variant="text">ADMIN Button</Button>
  </div>
  );
}


export default DoctorProfile;