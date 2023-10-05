import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Searchbar />
      {/* Your content goes here */}
    </div>
  );
}

export default App;
