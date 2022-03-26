import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import AdminDashboard from './pages/AdminDashboard';
import SymptomForm from './pages/SymptomForm';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';
import DoctorDashboard from './pages/DoctorDashboard.js';
import PatientProfile from './pages/PatientProfile.js';
import DoctorPatientProfile from './pages/DoctorPatientProfile.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorViewingPatient from './pages/DoctorViewingPatient.js';
import HealthOfficialPatientProfile from './pages/HealthOfficialPatientProfile.js';
import HealthOfficialViewingPatient from './pages/HealthOfficialViewingPatient.js';
import ImmigrationOfficerPatientProfile from './pages/ImmigrationOfficerPatientProfile.js';
import ImmigrationOfficerViewingPatient from './pages/ImmigrationOfficerViewingPatient.js';
import EditInfoForm from './pages/EditInfoForm';
import PatientCovidStatus from './pages/PatientCovidStatus';
import DoctorSchedule from './pages/DoctorSchedule';
import PatientAppointment from './pages/PatientAppointment';
import Home from './pages/Home';
import LiveChatPatient from './pages/LiveChatPatient';

import Cookies from 'js-cookie';
import Common from './components/Common'

function App() {

    // on correct authentication check (logged in) set role and id in localstorage (non-sensitive data)
    function checkAuth() {
        return new Promise(((resolve, reject) => {
            axios.get(
                "http://localhost:8080/checkAuth", { withCredentials: true }).then(res => {
                    localStorage.setItem("role", res.data.role)
                    localStorage.setItem("id", res.data.id)
                    resolve(res.data);
                }
                ).catch(err => {
                    console.log(err)
                })
        }))
    };

    useEffect(() => {
        checkAuth();
    }, []);
    
    return (
        <div className="App">
            <CssBaseline />
            <Common.Provider value={{ checkAuth }}>
                <Navbar />
                {/* Linking url paths to proper React components */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} checkAuth={checkAuth()} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/DoctorDashboard' element={<DoctorDashboard />} />
                    <Route path='/DoctorPatientProfile' element={<DoctorPatientProfile />} />
                    <Route path='/AdminDashboard' element={<AdminDashboard />} />
                    <Route path='/PatientProfile' element={<PatientProfile />} />
                    <Route path='/DoctorViewingPatient' element={<DoctorViewingPatient />} />
                    <Route path='/HealthOfficialPatientProfile' element={<HealthOfficialPatientProfile />}></Route>
                    <Route path='/HealthOfficialViewingPatient' element={<HealthOfficialViewingPatient />}></Route>
                    <Route path='/ImmigrationOfficerPatientProfile' element={<ImmigrationOfficerPatientProfile />}></Route>
                    <Route path='/ImmigrationOfficerViewingPatient' element={<ImmigrationOfficerViewingPatient />}></Route>
                    <Route path='/EditInfoForm' element={<EditInfoForm />} />
                    <Route path='/PatientCovidStatus' element={<PatientCovidStatus />} />
                    <Route path='/SymptomForm' element={<SymptomForm />} />
                    <Route path='/PatientAppointment' element={<PatientAppointment />} />
                    <Route path='/DoctorSchedule' element={<DoctorSchedule />} />
                    <Route path='/LiveChatPatient' element={<LiveChatPatient />} />
                </Routes>
            </Common.Provider>
            <Footer />
        </div>
    );
}

export default App;
