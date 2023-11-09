import React, {useEffect, useState} from 'react';
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Settingsbutton from './components/Settingsbutton';
import Signup from './components/Signup';
import Reset  from './components/Reset';
import Setting from './components/Setting';
import ManageAccount from "./components/ManageAccount";




function App() {
  const [isLogin, setisLogin] = useState(false);


  const handleLogin = () => {
    setisLogin(true);
    localStorage.setItem('isLogin', 'true');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLogIn');
    setisLogin(loggedIn === 'true');
  },[]);

  const handleLogout = () => {
    setisLogin(false);
    localStorage.removeItem('isLogIn');
    window.location.href = "/CSE442-542/2023-Fall/cse-442ae/build/";
  };

  return (
      <div className="App">
        <Router>
          <Navbar isLogin={isLogin} handleLogout={handleLogout}/>
          <Settingsbutton isLogin={isLogin} />
          <div style={{paddingTop: 100}}></div>
          <Routes>
            <Route path="/CSE442-542/2023-Fall/cse-442ae/build/" element={<Home />} />
            <Route path="/CSE442-542/2023-Fall/cse-442ae/build/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/CSE442-542/2023-Fall/cse-442ae/build/signup" element={<Signup />} />
            <Route path="/CSE442-542/2023-Fall/cse-442ae/build/Setting" element={<Setting />} />
            <Route path="/CSE442-542/2023-Fall/cse-442ae/build/Reset" element={<Reset />} />
            <Route path="/CSE442-542/2023-Fall/cse-442ae/build/manageaccount" element={<ManageAccount handleLogout={handleLogout}/>} />

          </Routes>
        </Router>
      </div>
  );
}

export default App;
