import { Container, Button, CardHeader, Avatar, IconButton, Typography, Grid, Paper, Card, styled, TextField } from '@mui/material';
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

function AdminDashboard() {

  const [doctorListValidated, setDoctorListValidated] = useState([]); //all doctor info
  const [doctorListUnvalidated, setDoctorListUnvalidated] = useState([]); //all doctor info
  const [healthOfficialListValidated, setHealthOfficialListValidated] = useState([]); //all validated health official info
  const [healthOfficialListUnvalidated, setHealthOfficialListUnvalidated] = useState([]); //all unvalidated health official info
  const [immigrationOfficerListValidated, setImmigrationOfficerListValidated] = useState([]); //all validated immigration officer info
  const [immigrationOffficerListUnvalidated, setImmigrationOfficerListUnvalidated] = useState([]); //all unvalidated immigration officer info

  var docSearch = "";
  var docOf = doctorListValidated.filter(e => e.Fname.includes(docSearch)); //returns a filtered list of doctors based on search
  
  const filterMyDoc = () => { //this function will set the useState filteredPatients to show the patients assigned specifically to the doctor who is logged in
    setDoctorListValidated(docOf)
  };
  
  function getValidatedDoctors() { //this function will return all information associated to validated doctors
    Axios.get("http://localhost:8080/adminViewingValidatedDoctorData").then((response) => {
      setDoctorListValidated(response.data);
      console.log("Validated Doctors:");
      console.log(response.data);
    });
  };

  function getUnvalidatedDoctors() { //this function will return all information associated to unvalidated doctors
    Axios.get("http://localhost:8080/adminViewingUnvalidatedDoctorData").then((response) => {
      setDoctorListUnvalidated(response.data);
      console.log("Unvalidated Doctors:");
      console.log(response.data);
    });
  };

  function getValidatedHealthOfficials() {
    Axios.get("http://localhost:8080/adminViewingValidatedHealthOfficalData").then((response) => {
      setHealthOfficialListValidated(response.data);
      console.log("Validated HO:");
      console.log(response.data);
    });
  };

  function getUnvalidatedHealthOfficials() {
    Axios.get("http://localhost:8080/adminViewingUnvalidatedHealthOfficalData").then((response) => {
      setHealthOfficialListUnvalidated(response.data);
      console.log("Unvalidated HO:");
      console.log(response.data);
    });
  };

  function getValidatedImmigrationOfficers() {
    Axios.get("http://localhost:8080/adminViewingValidatedImmigrationOfficerData").then((response) => {
      setImmigrationOfficerListValidated(response.data);
      console.log("Validated IO:");
      console.log(response.data);
    });
  };

  function getUnvalidatedImmigrationOfficers() {
    Axios.get("http://localhost:8080/adminViewingUnvalidatedImmigrationOfficerData").then((response) => {
      setImmigrationOfficerListUnvalidated(response.data);
      console.log("Unvalidated IO:");
      console.log(response.data);
    });
  };

  let validateDoctor = (ID) => { //this function will validate doctors on click
    Axios.post("http://localhost:8080/validateDoctor", {
      DoctorID: ID
    }).then(() => {
      console.log("successfully validated doctor!")
    });
    window.location.reload(false);
  };

  let invalidateDoctor = (ID) => { //This function will update the validate attribute in the users table
    if (!window.confirm("Are you sure you would like to deny this account? This will permanently delete the account from the system and inform the contact by email.")) {
      return;
    }

    Axios.post("http://localhost:8080/invalidateDoctor", { //This request will invalidate a doctor
      DoctorID: ID
    }).then(() => {
      console.log("successfully invalidated doctor!")
    });
    window.location.reload(false);
  };

  let validateHO = (ID) => { //this function will validate health officials on click
    Axios.post("http://localhost:8080/validateHealthOfficial", {
      HealthOfficialID: ID
    }).then(() => {
      console.log("successfully validated health official!")
    });
    window.location.reload(false);
  };

  let invalidateHO = (ID) => { //This function will update the validate attribute in the users table
    if (!window.confirm("Are you sure you would like to deny this account? This will permanently delete the account from the system and inform the contact by email.")) {
      return;
    }

    Axios.post("http://localhost:8080/invalidateHealthOfficial", { //This request will invalidate a health official
      HealthOfficialID: ID
    }).then(() => {
      console.log("successfully invalidated health official!")
    });
    window.location.reload(false);
  };

  let validateIO = (ID) => { //this function will validate immigration officers on click
    Axios.post("http://localhost:8080/validateImmigrationOfficer", {
      ImmigrationOfficerID: ID
    }).then(() => {
      console.log("successfully validated immigration officer!")
    });
    window.location.reload(false);
  };
  
  let invalidateIO = (ID) => { //This function will update the validate attribute in the users table
    if (!window.confirm("Are you sure you would like to deny this account? This will permanently delete the account from the system and inform the contact by email.")) {
      return;
    }

    Axios.post("http://localhost:8080/invalidateImmigrationOfficer", { //This request will invalidate a immigration officer
      ImmigartionOfficerID: ID
    }).then(() => {
      console.log("successfully invalidated immigration officer!")
    });
    window.location.reload(false);
  };

  function sendEmail() { //Feature to be implemented soon
    Axios.post("http://localhost:8080/sendEmail").then(() => {
      console.log("Sent Email!")
    });
  }


  let stopeffect = 1;

  useEffect(() => { //functions executed upon page render
    getValidatedDoctors();
    getUnvalidatedDoctors();
    getValidatedHealthOfficials();
    getUnvalidatedHealthOfficials();
    getValidatedImmigrationOfficers();
    getUnvalidatedImmigrationOfficers();
    //sendEmail();

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
      {/* Doctor Block */}
      <Container maxWidth="md" sx={{ padding: '2%' }}>
        {/* Title Doctor Block and Standard Grid Sizing */}
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant="body1" color="initial" >
                Doctors
              </Typography>
            </Card>
          </Grid>
          {/* SEARCH BAR TOO IMPLEMENT NEXT SPRINT */}
          {/* <Grid item xs={4}>
            <TextField id="docSearch" label="Search" variant="filled" onChange={() => filterMyDoc()}>{docSearch}</TextField>
          </Grid> */}
        </Grid>
        {/*  Grid Sizing for Doctor Invalid Accounts Paper Tiles */}
        <Grid container spacing={2} >
        {doctorListUnvalidated.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
                <UrgentPaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="">
                        D{key}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=""></IconButton>
                    }
                    title = {val.Fname + " " + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                   <Typography variant="body2" display="block" gutterBottom sx={{ marginLeft: '20%', color: 'black'}}>Doctor License: {val.License}</Typography>
                  <Button  sx={{ marginLeft: '20%'}} variant="contained" color="primary" onClick={() => validateDoctor(val.ID)} >
                  VALIDATE
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => invalidateDoctor(val.ID)} sx={{ ml: '2%' }} >
                  DENY
                  </Button>
                </UrgentPaper>
              </Grid>
            )
          }
          )}
           {/*  Grid Sizing for Doctor Invalid Accounts Paper Tiles */}
          {doctorListValidated.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
                <TilePaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="">
                        D{key}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=""></IconButton>
                    }
                    title = {val.Fname + " " + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                   <Typography variant="body2" display="block" gutterBottom sx={{ marginLeft: '20%',}}>Doctor License: {val.License}</Typography>
                </TilePaper>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
      {/* Health Officials Block */}
      <Container maxWidth="md" sx={{ padding: '2%' }}>
        {/* Title Health Official Block and Standard Grid Sizing */}
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant="body1" color="initial" >
                Health Officials
              </Typography>
            </Card>
          </Grid>
          {/* SEARCH BAR TOO IMPLEMENT NEXT SPRINT */}
          {/* <Grid item xs={4}>
            <TextField id="docSearch" label="Search" variant="filled" onChange={() => filterMyDoc()}>{docSearch}</TextField>
          </Grid> */}
        </Grid>
        {/*  Grid Sizing for Health Official Invalid Accounts Paper Tiles */}
        <Grid container spacing={2} >
        {healthOfficialListUnvalidated.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
                <UrgentPaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="">
                        D{key}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=""></IconButton>
                    }
                    title = {val.Fname + " " + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                   <Typography variant="body2" display="block" gutterBottom sx={{ marginLeft: '20%', color: 'black'}}></Typography>
                  <Button  sx={{ marginLeft: '20%'}} variant="contained" color="primary" onClick={() => validateHO(val.ID)} >
                  VALIDATE
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => invalidateHO(val.ID)} sx={{ ml: '2%' }} >
                  DENY
                  </Button>
                </UrgentPaper>
              </Grid>
            )
          }
          )}
           {/*  Grid Sizing for Doctor Invalid Accounts Paper Tiles */}
          {healthOfficialListValidated.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
                <TilePaper>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="">
                        D{key}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label=""></IconButton>
                    }
                    title = {val.Fname + " " + val.Lname} 
                    subheader = {`Contact: ${val.Phone}`} 
                  />
                   <Typography variant="body2" display="block" gutterBottom sx={{ marginLeft: '20%',}}></Typography>
                </TilePaper>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
      {/* Patients Block */}
    </div> </>
  );
}
export default AdminDashboard;
