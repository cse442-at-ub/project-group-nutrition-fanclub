import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Sidebar() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // Function to handle filter selection
  const handleFilterSelection = (filter) => {
    const updatedFilters = [...selectedFilters];

    if (updatedFilters.includes(filter)) {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1);
    } else {
      updatedFilters.push(filter);
    }
    setSelectedFilters(updatedFilters);
  };

  // Function to send selected filters to the server
  const sendFiltersToServer = () => {
    Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_signup/filters.php', { filters: selectedFilters })
      .then((response) => {
        // Handle the response from the server
        setFilteredRestaurants(response.data); // You can update your UI based on the response
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    sendFiltersToServer();
  }, [selectedFilters]);

  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-content">
          <ul>
            <li style={{paddingTop: '75%'}}></li>
            <div><h4><a style={{color: '#2E6F57'}}>Filter by</a></h4></div>
            <hr></hr>
            <li><h5><a>Cuisine</a></h5></li>
            <div class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="American"
                id="DefaultCheck"
                onChange={() => handleFilterSelection("American")}
                checked={selectedFilters.includes("American")}
              />
              <label className="form-check-label" for="DefaultCheck">American</label>
            </div>
            <div class="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Chinese"
                id="DefaultCheck2"
                onChange={() => handleFilterSelection("Chinese")}
                checked={selectedFilters.includes("Chinese")}
              />
              <label className="form-check-label" for="DefaultCheck2">Chinese</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Halal"
                id="DefaultCheck3"
                onChange={() => handleFilterSelection("Halal")}
                checked={selectedFilters.includes("Halal")}
              />
              <label className="form-check-label" for="DefaultCheck3">Halal</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Indian"
                id="DefaultCheck4"
                onChange={() => handleFilterSelection("Indian")}
                checked={selectedFilters.includes("Indian")}
              />
              <label className="form-check-label" for="DefaultCheck4">Indian</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Japanese"
                id="DefaultCheck5"
                onChange={() => handleFilterSelection("Japanese")}
                checked={selectedFilters.includes("Japanese")}
              />
              <label className="form-check-label" for="DefaultCheck5">Japanese</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Korean"
                id="DefaultCheck6"
                onChange={() => handleFilterSelection("Korean")}
                checked={selectedFilters.includes("Korean")}
              />
              <label className="form-check-label" for="DefaultCheck6">Korean</label>
            </div>
            <hr></hr>
            <li><h5><a>Food Options</a></h5></li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="DefaultCheck7"></input>
              <label className="form-check-label" for="DefaultCheck7">Boba</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="DefaultCheck8"></input>
              <label className="form-check-label" for="DefaultCheck8">Breakfast</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="DefaultCheck9"></input>
              <label className="form-check-label" for="DefaultCheck9">Pizza</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox"  value="" id="DefaultCheck10"></input>
              <label className="form-check-label" for="DefaultCheck10">Platter</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="DefaultCheck11"></input>
              <label className="form-check-label" for="DefaultCheck11">Noodles</label>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
