import React from 'react';
import './App.css';
import Navbar_login from './components/Navbar_login';
import Input_login from './components/Input_login';
import Bigbutton_login from './components/Bigbutton_login';
import Content_login from './components/Content_login';


function App() {
  return (
    <div class="App">
      <Navbar_login />
      <div className='app-container'>
        <Input_login placeholder="Username/Email address"/>
        <Input_login placeholder="Password" type="password"/>
        <Bigbutton_login/>
        <Content_login/>
      </div>
      {/* Your content goes here */}
    </div>
  );
}

export default App;