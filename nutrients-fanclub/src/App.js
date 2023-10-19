import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Settingsbutton from './components/Settingsbutton';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Settingsbutton />
        <div style={{paddingTop: 100}}></div>
        <Routes>
          <Route path="/CSE442-542/2023-Fall/cse-442ae/build/" element={<Home />} />
          <Route path="/CSE442-542/2023-Fall/cse-442ae/build/login" element={<Login />} />
          <Route path="/CSE442-542/2023-Fall/cse-442ae/build/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
