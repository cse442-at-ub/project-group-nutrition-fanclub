import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Restaurants from './components/Restaurants';
import Searchbar from './components/Searchbar';
import Settingsbutton from './components/Settingsbutton';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div class="App">
      <Navbar />
      <Sidebar />
      <Searchbar />
      <div className="container">
        <Restaurants />
      </div>
      <Settingsbutton />
    </div>
  );
}

export default App;
