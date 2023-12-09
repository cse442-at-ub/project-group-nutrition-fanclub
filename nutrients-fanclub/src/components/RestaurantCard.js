import React, { useState, useEffect } from 'react';
import ClickRestaurant from './ClickRestaurant';
import { useLocation } from 'react-router-dom';
import './Layout.css';
import axios from 'axios';
import Star from './Star';
const imageContext = require.context('./images', false, /\.(jpg)$/);
const images = imageContext.keys().reduce((acc, key) => {
  acc[key] = imageContext(key);
  return acc;
}, {});

function RestaurantCard({ restaurant }) {
  const [restaurantReview, setRestaurantReview] = useState('69'); // State to store the restaurant review

  const restaurantImage = images[`./${restaurant}.jpg`];


  useEffect(() => {
    // Function to send a POST request
    const sendPostRequest = async () => {
      try {
        const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend_signup/homepageRecent.php', {
          Restaurant: restaurant
        });

        // Update the restaurant review state with the data from the response
        setRestaurantReview(response.data["Username"] + ": " + response.data["Comment"]);
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    };

    // Call the function when the component is mounted
    sendPostRequest();
  },[restaurant]);

  return (
    <div className="col">
      <div className="card">
        <img src={restaurantImage} className="card-img-top" alt="..." style={{ maxHeight: 'fit-content' }} />
        <div className="card-body">
          <h5 className="card-title"><ClickRestaurant text={restaurant} /></h5>
          <p className="card-text"><small> {restaurantReview}</small></p>
          <p className="card-text">{restaurant.review}</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
