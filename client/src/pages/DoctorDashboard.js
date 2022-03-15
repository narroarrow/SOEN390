import { Avatar, Box, Grid, CardHeader,Paper, List, ListItem} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Navigate} from "react-router-dom";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import FlagIcon from '@mui/icons-material/Flag';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from '@devexpress/dx-react-chart-material-ui';



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
  const [patientsFlaggedNotViewedList, setPatientsFlaggedNotViewedList]= useState([]); //list of patients whose forms have not been reviewed
  const [patientsFlaggedLeastViewedList, setpatientsFlaggedLeastViewedList]= useState([]); //list of patients whose forms have been viewed from longest to most recent
  const [patientsFlaggedNoSymptomFormResponse, setpatientsFlaggedNoSymptomFormResponseList]= useState([]); //list of patients that have not yet submitted their form
  const [notificationsList, setNotificationsList]= useState([]); //list of notfications


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

  function getFlaggedPatientsNotViewed(){ //This will return the list of patients that have submitted a form but have not been reviewed
    Axios.post("http://localhost:8080/patientsFlaggedNotViewed").then((response)=>{
      setPatientsFlaggedNotViewedList(response.data);
      console.log("Flagged Patients Not Viewed");
      console.log(response.data)  
  });  
  };

  function getFlaggedPatientsLeastViewed(){ //This will return the list of patients whose form has been reviewed from longest to most recent
    Axios.post("http://localhost:8080/patientsFlaggedLeastViewed").then((response)=>{
      setpatientsFlaggedLeastViewedList(response.data);
      console.log("Patients Flagged Least Viewed");
      console.log(response.data)  
  });  
  };

  function getFlaggedPatientsNoSymptomFormResponse(){ //This will return the list of patients that have been sent a form to fill out but have not done so
    Axios.post("http://localhost:8080/patientsFlaggedNoSymptomFormResponse").then((response)=>{
      setpatientsFlaggedNoSymptomFormResponseList(response.data);
      console.log("Patients Flagged No Symptom Form Response:");
      console.log(response.data)  
  });  
  };

  function getAllNotifications(){//This will return patient name, and appointment time
    Axios.post("http://localhost:8080/retrieveAllNotifications", {
      params: {
        id: localStorage.getItem('id')
      }
    }).then((response)=>{
      setNotificationsList(response.data);
      console.log("Notification List:");
      console.log(response.data);  
  });  
  }

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
  getFlaggedPatientsNotViewed();
  getFlaggedPatientsLeastViewed();
  getFlaggedPatientsNoSymptomFormResponse();
  getAllNotifications();
  },[stopeffect]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const data = [
    { argument: 'Healthy', value: totalStatusCounts.map((val,key) => {
      return(val.healthyCount)}) },
    { argument: 'Isolated', value: totalStatusCounts.map((val,key) => {
      return(val.isolatedCount)}) },
    { argument: 'Infected', value: totalStatusCounts.map((val,key) => {
      return(val.infectedCount)}) },
  ];

  return (
      <>
        {
          localStorage.getItem("role")!='Doctor' && <Navigate to={"/"} refresh={true}/>
        }
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ marginBottom: '2%', padding: '2%' }} >
        <Grid item xs={8} >
          {totalStatusCounts.map((val,key) => {
              return(
          <Item key={key}> 
            <h1>Patient Registration Statistics</h1>
            <Chart data={data}>
              <ArgumentAxis />
              <ValueAxis />
              <BarSeries valueField="value" argumentField="argument" />
            </Chart>
          </Item>
          )})}

        </Grid>
        <Grid item xs={4}>
          <Item><h1>Notifications</h1>
          {notificationsList.map((val,key) => {
            return(
                <CardHeader
                  avatar={
                    <Avatar aria-label="">
                      {key+1}
                    </Avatar>
                  }
                  //display patient name and appointment time
                  title = {"Patient Name: " + val.Fname + " " + val.Lname}
                  subheader = {"Appointment Time: " + val.aptDate+ " "+val.startTime +" to "+ val.endTime}
                />
            )
          }
          )}
          </Item>
        </Grid>

        <Grid item xs={6} >
          <List>
            <Item>
              <h1>Doctor Registration Statistics</h1> 
              <hr></hr>
              {totalDoctorCount.map((val,key) => {
              return(
                <ListItem key={key}>
                 <LocalHospitalIcon></LocalHospitalIcon> Total Number of Registered Doctors: {val.allRegisteredDoctorsCount}
                </ListItem> 
              )})}
                <hr></hr>
              <ListItem><MedicationIcon></MedicationIcon>Doctors with Most Assigned Patients:</ListItem>
              {doctorsWithMostPatientsList.map((val,key) => {
              return(
                <ListItem key={key}>
                  {val.Fname} {val.LName} |  <EmailIcon fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon fontSize='small'></LocalPhoneIcon> {val.Phone} 
                </ListItem>
              )})}
               <hr></hr>
               <ListItem><MedicationIcon></MedicationIcon>Doctors with Least Assigned Patients:</ListItem>
              {doctorsWithLeastPatientsList.map((val,key) => {
              return(
                <ListItem key={key}>
                  {val.Fname} {val.LName} | <EmailIcon fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon fontSize='small'></LocalPhoneIcon> {val.Phone}
                </ListItem>
              )})}
               <hr></hr>
            </Item>
          </List>
        </Grid>
        <Grid item xs={6} >
          <List>
            <Item>
              <h1>Patients Active Assistance Required</h1> 
              <hr></hr>
              {totalPatientCount.map((val,key) => {
              return(
                <ListItem key={key}>
                 <AccessibilityIcon></AccessibilityIcon>Total Number of Registered Patients: {val.allPatientCount}
                </ListItem>
              )})}
              {totalFlaggedPatientCount.map((val,key) => {
              return(
                <ListItem key={key}>
                 <FlagIcon></FlagIcon>Total Number of Flagged Patients: {val.allFlaggedPatientCount}
                </ListItem>
              )})}
                <hr></hr>
                <ListItem><AccessibilityIcon></AccessibilityIcon>Patients Flagged and Not Viewed:</ListItem>
              {patientsFlaggedNotViewedList.map((val,key) => {
              return(
                <ListItem key={key}>
                 {val.Fname} {val.Lname} |  <EmailIcon fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon fontSize='small'></LocalPhoneIcon> {val.Phone} 
                </ListItem>
              )})}
               <hr></hr>
               <ListItem><AccessibilityIcon></AccessibilityIcon>Patients Least Recently Viewed:</ListItem>
              {patientsFlaggedLeastViewedList.map((val,key) => {
              return(
                <ListItem key={key}>
                 {val.Fname} {val.Lname} |  <EmailIcon fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon fontSize='small'></LocalPhoneIcon> {val.Phone} 
                </ListItem>
              )})}
               <hr></hr>
               <ListItem><AccessibilityIcon></AccessibilityIcon>Patients Flagged and Require Form Response Immediately:</ListItem>
               {patientsFlaggedNoSymptomFormResponse.map((val,key) => {
              return(
                <ListItem key={key}>
                 {val.Fname} {val.Lname} |  <EmailIcon fontSize='small'></EmailIcon> {val.Email} | <LocalPhoneIcon fontSize='small'></LocalPhoneIcon> {val.Phone} 
                </ListItem>
              )})}
               <hr></hr>

            </Item>
          </List>
        </Grid>
        
      </Grid>
    </Box>
 </>
  );
}

export default DoctorDashboard;