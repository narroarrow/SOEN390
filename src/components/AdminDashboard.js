import { Card, Container } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';

function AdminDashboard() {
  return (
  <div>
      
      <Card sx={{ maxWidth: 275 }}><h1>Admin Dashboard </h1></Card>
      <Button variant="text">ADMIN Button</Button>
  </div>
  );
}


export default AdminDashboard;