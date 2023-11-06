import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { useNavigate } from 'react-router-dom';

function RestaurantFilter() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedFiltersText, setSelectedFiltersText] = useState('');
  const navigate = useNavigate();

  const handleFilterSelection = (filter) => {
    const updatedFilters = [...selectedFilters];

    if (updatedFilters.includes(filter)) {
      updatedFilters.splice(updatedFilters.indexOf(filter), 1);
    } else {
      updatedFilters.push(filter);
    }

    setSelectedFilters(updatedFilters);
  };

  const sendFiltersToServer = async () => {
    try {
      const response = await Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_signup/filterstest.php', { filters: selectedFilters });
      if (response.status === 200) {
        //navigate('/CSE442-542/2023-Fall/cse-442ae/build/login');
         const info = String(response.data);
         const filtered = info.split(",");
         setFilteredRestaurants(filtered);
         console.log('Request successful');
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // Axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_signup/filters.php', { filters: selectedFilters.join(',') })
    //   .then((response) => {
    //     setFilteredRestaurants(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //     // Optionally, handle the error further, e.g., show an error message to the user.
    //   });
  };

  const handleApplyFilters = () => {
    sendFiltersToServer(selectedFilters);
    setSelectedFiltersText(selectedFilters.join(', '));
  };

  useEffect(() => {
    // Fetch all restaurants initially
    Axios.get('nutrients-fanclub\backend_updated\filters.php')
      .then((response) => {
        setFilteredRestaurants(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <div className="container-fluid" style={{ paddingTop: '10px' }}>
        <form className="d-flex">
          <div className="h3" style={{ whiteSpace: 'nowrap', paddingRight: 10, paddingLeft: 150, color: '#2E6F57' }}>
            <a>Find your campus grub!</a>
          </div>
          <input className="form-control me-1 rounded-pill" type="search" placeholder="Search by name" aria-label="Search" />
          <button className="btn btn-outline-success rounded-pill" type="submit">
            Search
          </button>
        </form>
      </div>

      <div className="container">
        <div className="sidebar">
          <div className="sidebar-content">
            <ul>
              <li style={{ paddingTop: '75%' }}></li>
              <div>
                <h4 style={{ color: '#2E6F57' }}>Filter by</h4>
              </div>
              <hr />
              <li>
                <h5>Cuisine</h5>
              </li>
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
              <li>
                <h5>Food Options</h5>
              </li>
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
              <button className="btn btn-primary" onClick={handleApplyFilters}>
                Apply
              </button>
              <div>
                <p>Selected Filters: {selectedFiltersText}</p>
                <p>Restaurants: {filteredRestaurants}</p>
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ padding: '2%', paddingLeft: 160 }}>
        {filteredRestaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantFilter;
