import React from 'react';
import Restaurants from './Restaurants';
import Searchbar from './Searchbar';
import Sidebar from './Sidebar';

function Home() {
  return (
    <div>
      <Sidebar />
      <Searchbar />
      <div className="container">
        <Restaurants />
      </div>
    </div>
  );
}

export default Home;
