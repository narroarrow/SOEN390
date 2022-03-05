import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import AdminDashboard from './pages/AdminDashboard';
import SymptomForm from './pages/SymptomForm';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';
import DoctorDashboard from './pages/DoctorDashboard.js';
import PatientProfile from './pages/PatientProfile.js';
import DoctorPatientProfile from './pages/DoctorPatientProfile.js';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DoctorViewingPatient from './pages/DoctorViewingPatient.js';
import HealthOfficialPatientProfile from './pages/HealthOfficialPatientProfile.js';
import HealthOfficialViewingPatient from './pages/HealthOfficialViewingPatient.js';
import EditInfoForm from './pages/EditInfoForm';
import PatientCovidStatus from './pages/PatientCovidStatus';


function App() {

    const [exampleData, setExampleData] = useState([{}])

    // one test of calling to backend
    useEffect(() => {

        const callCheckHealth = async () => {

            try {

                const url = "http://localhost:8080/api"
                const headers = {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                const res = await axios(url);
                console.log("Data from backend---", res.data)
                setExampleData(res.data)
                console.log('the example data is: ', res.data)


            } catch (err) {
                console.log(err);
            }
        }
        callCheckHealth();
    }, [])

    //second test using cookies

    function secondTest() {
        axios.get(
            "http://localhost:8080/users", {withCredentials: true}).then(res => {
            console.log(res)
        }).catch(err => console.log(err))
    }

    function checkAuth() {
        axios.get(
            "http://localhost:8080/checkAuth", {withCredentials: true}).then(res => console.log(res)
            // USER DATA IS IN RES
        ).catch(err => console.log(err))
    }
    useEffect(() => {checkAuth();}, [])
  return (
      <div className="App">
        <CssBaseline />

        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/DoctorDashboard' element={<DoctorDashboard/>} />
          <Route path='/DoctorPatientProfile' element={<DoctorPatientProfile/>} />
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/PatientProfile' element={<PatientProfile/>}/>
          <Route path='/DoctorViewingPatient' element={<DoctorViewingPatient/>}/>
          <Route path='/HealthOfficialPatientProfile' element={<HealthOfficialPatientProfile/>}></Route>
          <Route path='/HealthOfficialViewingPatient' element={<HealthOfficialViewingPatient/>}></Route>
          <Route path='/EditInfoForm' element={<EditInfoForm/>}/>
          <Route path='/PatientCovidStatus' element = {<PatientCovidStatus/>}/>
          <Route path='/SymptomForm' element={<SymptomForm/>}/>
          
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
