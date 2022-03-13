import { Container, Button, CardHeader, Avatar, IconButton, Typography, Grid, Paper, Card, styled, TextField } from '@mui/material';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';


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

function AdminDashboard() {

    const [patientList, setPatientList] = useState([]); //all patient info
    const [filteredPatientList, setFilteredPatientList] = useState([]); //all patient info
    const [doctorListValidated, setDoctorListValidated] = useState([]); //all doctor info
    const [doctorListUnvalidated, setDoctorListUnvalidated] = useState([]); //all doctor info

    var ptSearch = "";
    var patientsOf = patientList.filter(e => e.Fname.includes(ptSearch) ); //returns a filtered list of patients based on search
    var allPatients = patientList;

    var docSearch = "";
    var docOf = doctorListValidated.filter(e => e.Fname.includes(docSearch) ); //returns a filtered list of doctors based on search

    const filterMyPatients = () => { //this function will set the useState filteredPatients to show ALL patients
      setPatientList(patientsOf)
    };

    const filterAllPatients = () => { //this function will set the useState filteredPatients to show the patients assigned specifically to the doctor who is logged in
      setFilteredPatientList(allPatients)
    };

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

  function getPatients() { //this function will return all information associated to patients
    Axios.get("http://localhost:8080/adminViewingPatientData").then((response) => {
      setPatientList(response.data);
      setFilteredPatientList(response.data);
      console.log("Patients:");
      console.log(response.data);
    });
  };

  let validateDoctor = (ID) => { //this function will validate doctors on click
    Axios.post("http://localhost:8080/validateDoctor", {
      DoctorID: ID
    }).then(()=>{
      console.log("successfully validated doctor!")
    });
    window.location.reload(false);
  };

  let invalidateDoctor = (ID) => { //This function will update the validate attribute in the users table
    Axios.post("http://localhost:8080/invalidateDoctor", {
      DoctorID: ID
    }).then(()=>{
      console.log("successfully invalidated doctor!")
    });
    window.location.reload(false);
  };

let stopeffect = 1;

useEffect(() => { //functions executed upon page render
  getValidatedDoctors();
  getUnvalidatedDoctors();
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
        title="Welcome Admin"
        subheader="Admin"
      />
      <Container maxWidth="md" sx={{ pb: '2%' }}>
        <Grid container spacing={2} >
          <Grid item xs={8}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant="body1" color="initial" >
                Patients
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <TextField id="ptSearch" label="Search" variant="filled" onChange={() => filterMyPatients()}>{ptSearch}</TextField>
          </Grid>
        </Grid>

        <Grid container spacing={2} >
          {filteredPatientList.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
              <Item>
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
                 <Typography variant="body2" display="block" gutterBottom sx={{ marginLeft: '20%',}}>Contact: ${val.Phone}</Typography>
              </Item>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
      <hr></hr>
      <Container maxWidth="md" sx={{ padding: '2%' }}>
        <Grid container spacing={2} >
          <Grid item xs={8}>
            <Card container sx={{ marginBottom: '2%', padding: '3%' }}>
              <Typography variant="body1" color="initial" >
                Doctors
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <TextField id="docSearch" label="Search" variant="filled" onChange={() => filterMyDoc()}>{docSearch}</TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} >
        {doctorListUnvalidated.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
                <Item3>
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
                  <Button variant="contained" color="primary" onClick={() => validateDoctor(val.ID)} >
                  VALIDATE
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => invalidateDoctor(val.ID)} sx={{ ml: '2%' }} >
                  DENY
                  </Button>
                </Item3>
              </Grid>
            )
          }
          )}
          {doctorListValidated.map((val,key) => {
            return(
              <Grid item xs={4} key={key}>
                <Item>
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
                </Item>
              </Grid>
            )
          }
          )}
        </Grid> 
      </Container>
    </div>
  );
}
export default AdminDashboard;