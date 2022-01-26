import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';


function App() {
  return (
      <div className="App">
        <CssBaseline />
        <Footer/>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/AdminDashboard' element={<AdminDashboard/>} />
        </Routes>
      </div>
  );
}

export default App;
