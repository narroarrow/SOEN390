import { Container, Button, CardHeader, Avatar, IconButton, Typography, Grid, Paper, Card, styled } from '@mui/material';
import { Axios } from 'axios';
import React, { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: '#d3d3d3',
}));

const Item3 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1), 
  textAlign: 'center',
  color: 'red',
}));

// function AdminDashboard() {
//   const [patientList, setPatientList] = useState([]); //all patient info
//   const [doctorList, setDoctorList] = useState([]); //all doctor info

//   var allPatients = patientList;
//   var allDoctors = doctorList;

//   function getDoctors() {
//     Axios.get("http://localhost:8080/adminViewingDoctorData").then((response) => {
//       setDoctorList(response.data);
//       console.log(doctorList);
//     });
//   };
//   function getPatients() {
//     Axios.get("http://localhost:8080/adminViewingPatientData").then((response) => {
//       setPatientList(response.data);
//       console.log(patientList);
//     });
//   };
// };

// let stopeffect = 1;

// useEffect(() => {
//   getDoctors();
//   getPatients();
// },[stopeffect]);


function PatientProfile() {

  const [patientList, setPatientList] = useState([]); //all patient info
  const [doctorList, setDoctorList] = useState([]); //all doctor info

  var allPatients = patientList;
  var allDoctors = doctorList;

  function getDoctors() {
    Axios.get("http://localhost:8080/adminViewingDoctorData").then((response) => {
      setDoctorList(response.data);
      console.log(doctorList);
    });
  };
  function getPatients() {
    Axios.get("http://localhost:8080/adminViewingPatientData").then((response) => {
      setPatientList(response.data);
      console.log(patientList);
    });
  };


let stopeffect = 1;

useEffect(() => {
  getDoctors();
  getPatients();
},[stopeffect]);

  return (
    <div>
      <CardHeader
        avatar={
          <Avatar aria-label="">
          </Avatar>
        }
        action={
          <IconButton aria-label=""></IconButton>
        }
        title="My Admin Profile"
        subheader="Name of Admin"
      />
      <Container maxWidth="md" sx={{ pb: '2%' }}>
        <Grid container spacing={2} >
          <Grid item xs={11}>
            <Card container sx={{ marginBottom: '2%', padding: '2%' }}>
              <Typography variant="body1" color="initial" >
                Patients
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" >
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    P1
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Patient 1 Profile "
                subheader="Status: Active"
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    P2
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Patient 2 Profile "
                subheader="Status: Active"
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    P3
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Patient 3 Profile "
                subheader="Status: Active"
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item><CardHeader
              avatar={
                <Avatar aria-label="">
                  P4
                </Avatar>
              }
              action={
                <IconButton aria-label=""></IconButton>
              }
              title="Patient 4 Profile "
              subheader="Status: Active"
            /></Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    P5
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Patient 5 Profile "
                subheader="Status: Active"
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item2 >
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    P6
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Patient 6 Profile "
                subheader="Status: Inactive"
              />
            </Item2>
          </Grid>
        </Grid>
      </Container>
      <hr></hr>
      <Container maxWidth="md" sx={{ padding: '2%' }}>
        <Grid container spacing={2} >
          <Grid item xs={11}>
            <Card container sx={{ marginBottom: '2%', padding: '2%' }}>
              <Typography variant="body1" color="initial" >
                Doctors
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={1}>
            <Button variant="contained" color="primary" >
              Filter
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} >
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    D1
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Doctor 1 Profile "
                subheader="Status: Active"
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    D2
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Doctor 2 Profile "
                subheader="Status: Active"
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    D3
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Doctor 3 Profile "
                subheader="Status: Active"
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    D4
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Doctor 4 Profile "
                subheader="Status: Active" />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item3>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    D5
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Doctor 5 Profile "
                subheader="Status: Action Required"
              />
            </Item3>
          </Grid>
          <Grid item xs={4}>
            <Item2>
              <CardHeader
                avatar={
                  <Avatar aria-label="">
                    D6
                  </Avatar>
                }
                action={
                  <IconButton aria-label=""></IconButton>
                }
                title="Doctor 6 Profile "
                subheader="Status: Inactive"
              />
            </Item2>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
export default PatientProfile;