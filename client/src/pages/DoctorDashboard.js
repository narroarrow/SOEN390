import { Avatar, IconButton, Button, Box, Grid, CardHeader,} from '@mui/material';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';


function DoctorDashboard() {

  const [patientList, setPatientList] = useState([]); //all patient info
  const [patientsPerDoctor, setPatientPerDoctorList] = useState([]); //all patient info
  const [allPatients, setAllPatientList] = useState([]); //all patient info
  const [totalPatientCount, setTotalPatientCount] = useState([]); // total patient count
  const [totalDoctorCount, setValidatedDoctorCount] = useState([]); // total doctor count
  const [totalFlaggedPatientCount, setTotalFlaggedPatientCount]= useState([]); //total flagged patient count
  const [totalStatusCounts, setTotalStatusCounts]= useState([]); // patient status count
  const [doctorsWithMostPatientsList, setDoctorsWithMostPatientsList]= useState([]); //list of doctors with most patients
  const [doctorsWithLeastPatientsList, setDoctorsWithLeastPatientsList]= useState([]); //list of doctors with least patients

  var tempDoctorID = 6;

  function getDoctorPatients() { //returns all patient information for a given doctor using GET
    Axios.get("http://localhost:8080/doctorViewingTheirPatientData", {params: {id: tempDoctorID}}).then((response) => {
      setPatientList(response.data);
      console.log("Logged In Doctor Patients:");
      console.log(response.data);
    });
  };

  function getPatientsPerDoctor(){ //returns all patient information organized by doctor using GET
    Axios.get("http://localhost:8080/doctorViewingDoctorPatients").then((response) => {
      setPatientPerDoctorList(response.data);
      console.log("Patients Organized By Doctor:");
      console.log(response.data);
    });
  };

  
  function getAllPatients(){ //returns all patient information using GET
    Axios.get("http://localhost:8080/doctorViewingAllPatientData").then((response) => {
      setAllPatientList(response.data);
      console.log("All Patients:");
      console.log(response.data);
    });  
  };

  function getStatusCountAllPatients(){// This will return the number of patients classified under each status
    Axios.post("http://localhost:8080/statusCountAllPatients").then((response)=>{
      setTotalStatusCounts(response.data);
      console.log("Counts:");
      console.log(response.data)  
  });
  };

  function getDoctorsWithMostPatients(){ //This will return the top 5 doctors with most to least patients
    Axios.post("http://localhost:8080/doctorsWithMostPatients").then((response)=>{
      setDoctorsWithMostPatientsList(response.data);
      console.log("Doctors With Most Patients:");
      console.log(response.data)  
  });  
  };

  function getDoctorsWithLeastPatients(){ //This will return the top 5 doctors with least to most patients
    Axios.post("http://localhost:8080/doctorsWithLeastPatients").then((response)=>{
      setDoctorsWithLeastPatientsList(response.data);
      console.log("Doctors With Least Patients:");
      console.log(response.data)  
  }); 
  };

  function getTotalNumberOfDoctors(){ //This will return the total number of validated doctors
    Axios.post("http://localhost:8080/countAllValidatedDoctors").then((response)=>{
      setValidatedDoctorCount(response.data);
      console.log("Total Number of Doctors:");
      console.log(response.data)  
  });  
  };

  function getTotalNumberOfPatients(){ //This will return the total number of validated doctors
    Axios.post("http://localhost:8080/countAllPatients").then((response)=>{
      setTotalPatientCount(response.data);
      console.log("Total Number of Patients:");
      console.log(response.data)  
  });  
  }; 
  

  function getTotalNumberOfFlaggedPatients(){ //This will return the total number of validated doctors
    Axios.post("http://localhost:8080/countAllFlaggedPatients").then((response)=>{
      setTotalFlaggedPatientCount(response.data);
      console.log("Total Number of Flagged Patients:");
      console.log(response.data)  
  });  
  };

  let stopeffect = 1;

  useEffect(() => { //when the doctor dashboard page is rendered, these functions are executed
  getDoctorPatients();
  getPatientsPerDoctor();
  getAllPatients();
  getTotalNumberOfPatients();
  getTotalNumberOfDoctors();
  getTotalNumberOfFlaggedPatients();
  getStatusCountAllPatients();
  getDoctorsWithMostPatients();
  getDoctorsWithLeastPatients();
  },[stopeffect]);

  return (
    <div>
      <Box sx={{ padding: 5 }}>
        <h1>Doctor Dashboard
          <Button variant="outlined" href="#outlined-buttons" sx={{ textAlign: 'right', position: 'absolute', right: '10%' }}>
            Filter
          </Button>
        </h1>
      </Box>
      <Box sx={{ flexGrow: 1 }} textAlign='center'>
        <Grid container spacing={5} columns={12}>
          {Array.from(Array(12)).map((_, index) => ( //array value is the number of patients
            <Grid item md={4} key={index}>
              <button>
                <CardHeader
                  avatar={
                    <Avatar aria-label="">
                      P{index}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label=""></IconButton>
                  }
                  title="Patient Profile"
                  subheader="Name of Patient"
                />
              </button>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ padding: 10 }}>
        <Button variant="outlined" href="#outlined-buttons" sx={{ textAlign: 'right', position: 'absolute', right: '9%' }}>
          Review Medical Checklist
        </Button>
      </Box>
    </div>
  );
}
export default DoctorDashboard;