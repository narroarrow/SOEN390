import { Container, Button, CardHeader, Avatar, IconButton, Typography, Grid, Paper, Card, styled, Autocomplete, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from "react-router-dom";

//Paper Styling for Tiles
const TilePaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

//Paper Styling for Inactive Accounts
const InactivePaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backgroundColor: '#d3d3d3',
}));

//Paper Styling for Urgent Accounts
const UrgentPaper = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'red',
}));

function AdminPatientDashboard() {

  const [patientList, setPatientList] = useState([]); //all patient info
  const [filteredPatientList, setFilteredPatientList] = useState([]); //all patient info
  const [availableDoctorsList, setMostToLeastPatients] = useState([]);

  var ptSearch = "";
  var patientsOf = patientList.filter(e => e.Fname.includes(ptSearch)); //returns a filtered list of patients based on search
  var allPatients = patientList;

  var docSearch = "";
  
  const filterMyPatients = () => { //this function will set the useState filteredPatients to show ALL patients
    setPatientList(patientsOf)
  };

  const filterAllPatients = () => { //this function will set the useState filteredPatients to show the patients assigned specifically to the doctor who is logged in
    setFilteredPatientList(allPatients)
  };

  // Alert Box 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const options = 
    availableDoctorsList.map((val, key) => 
      ({
        label: val.Fname + ' '+ val.Lname,
        value: val.ID
      })
    )
  ;



  function getPatients() { //this function will return all information associated to patients
    Axios.get("http://localhost:8080/adminViewingPatientData").then((response) => {
      setPatientList(response.data);
      setFilteredPatientList(response.data);
      // console.log("Patients:");
      // console.log(response.data);
    });
  };

  function getDoctorMostAvailable() { //this function will return doctors sorted by the most available
    Axios.get("http://localhost:8080/mostToLeastPatients").then((response) => {
      setMostToLeastPatients(response.data);
      console.log("Doctors Most Available :");
      console.log(response.data);
    });
  };

  let stopeffect = 1;

  useEffect(() => { //functions executed upon page render
    getPatients();
    getDoctorMostAvailable();
  }, [stopeffect]);

  return (
    <>
      {
        localStorage.getItem("role") != 'Admin' && <Navigate to={"/"} refresh={true} />
      }
    <div>
      <CardHeader
        avatar={
          <Avatar aria-label="">
          </Avatar>
        }
        action={
          <IconButton aria-label=""></IconButton>
        }
        title="Welcome Admin"
        subheader="Admin"
      />
      {/* Title Patient Block and Standard Grid Sizing */}
      <Container maxWidth="md" sx={{ pb: '2%' }}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant="body1" color="initial" >
                Patients
              </Typography>
            </Card>
          </Grid>
          {/* SEARCH BAR TOO IMPLEMENT NEXT SPRINT */}
          {/* <Grid item xs={4}>
            <TextField id="ptSearch" label="Search" variant="filled" onChange={() => filterMyPatients()}>{ptSearch}</TextField>
          </Grid> */}
        </Grid>
        {/* Grid Sizing for Patient Paper Tiles */}
        <Grid container spacing={2} >
          {filteredPatientList.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
              <TilePaper>
                <CardHeader
                  avatar={
                    <Avatar aria-label="">
                      P{key}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label=""></IconButton>
                  }
                  title = {val.Fname + " " + val.Lname} 
                  subheader = {`Doctor: ${val.docFname} ${val.docLname}`} 
                />
                 <Typography variant="body2" display="block" gutterBottom sx={{ marginLeft: '20%',}}>Contact: {val.Phone}</Typography>
                 <Button  sx={{ marginLeft: '20%'}} variant="contained" color="primary"  onClick={handleClickOpen} >
                  REASSIGN
                  </Button>
              </TilePaper>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
      <hr></hr>
      {/* Alert Box for reassigning Patients */}
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>Reassign Patient</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{pb:"2%"}}>
            Select a doctor to reassign the selected patient to.
          </DialogContentText>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ height: '80%' }}
                renderInput={(params) => <TextField {...params} label="Doctor" />}
              />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={handleClose}>SUBMIT</Button>
          {/* (event, value) => console.log(value)} */}
        </DialogActions>
      </Dialog>
    </div> </>
  );
}
export default AdminPatientDashboard;
