import Axios from 'axios';
import React, { useEffect, useState } from 'react';

function Sidebar() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const handleFilterSelection = (filter) => {
    const updatedFilters = [...selectedFilters];

    if (updatedFilters.includes(filter)) {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1);
    } else {
      updatedFilters.push(filter);
    }

    setSelectedFilters(updatedFilters);
  };

  const sendFiltersToServer = () => {
    Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_signup/filters.php', { filters: selectedFilters })
      .then((response) => {
        setFilteredRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        // Optionally, handle the error further, e.g., show an error message to the user.
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
            <li style={{ paddingTop: '75%' }}></li>
            <div><h4 style={{ color: '#2E6F57' }}>Filter by</h4></div>
            <hr />
            <li><h5>Cuisine</h5></li>
            {["American", "Chinese", "Halal", "Indian", "Japanese", "Korean"].map((cuisine, index) => (
              <div className="form-check" key={cuisine}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={cuisine}
                  id={`DefaultCheck${index}`}
                  onChange={() => handleFilterSelection(cuisine)}
                  checked={selectedFilters.includes(cuisine)}
                />
                <label className="form-check-label" htmlFor={`DefaultCheck${index}`}>{cuisine}</label>
              </div>
            ))}
            <hr />
            <li><h5>Food Options</h5></li>
            {["Boba", "Breakfast", "Pizza", "Platter", "Noodles"].map((food, index) => (
              <div className="form-check" key={food}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={food}
                  id={`FoodCheck${index}`}
                  onChange={() => handleFilterSelection(food)}
                  checked={selectedFilters.includes(food)}
                />
                <label className="form-check-label" htmlFor={`FoodCheck${index}`}>{food}</label>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;