import Login from './components/Login'
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import DoctorProfile from './components/DoctorProfile'
import PatientProfile from './components/PatientProfile';




function App() {
  return (
      <div className="App">
        <CssBaseline />
        
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/DoctorProfile' element={<DoctorProfile/>} />
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/PatientProfile' element={<PatientProfile/>}/>
          
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
