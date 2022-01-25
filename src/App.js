import Header from './components/Header'
import Login from './components/Login'
import Signup from './components/Signup';
import { Switch, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <div className="App">
        <Header/>
        {/* <Login/> */}
        {/* <Routes> */}
          <Route path='/login' component={Login} />
          <Route path='/Signup' component={Signup} />
        {/* </Routes> */}
        
        {/* <Signup/> */}
      </div>
  );
}

export default App;
