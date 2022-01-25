import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup';
import { Switch, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>} />
        </Routes>
      </div>
  );
}

export default App;
