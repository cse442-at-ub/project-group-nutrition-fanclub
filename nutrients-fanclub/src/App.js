import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Restaurants from './components/Restaurants';
import Searchbar from './components/Searchbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Searchbar />
      <Restaurants />
      {/* Your content goes here */}
    </div>
  );
}

export default App;
