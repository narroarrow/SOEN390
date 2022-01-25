import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import { Switch, Route, Routes } from 'react-router-dom';


function App() {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
          <Route path='/AdminDashboard' element={<AdminDashboard/>} />
        </Routes>
      </div>
  );
}

export default App;
