import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClickRestaurant = ({ text }) => {
    const navigate = useNavigate();


    const handleClick = async () => {
        try {
            const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Return_Data.php', { restaurant_name: text });
            const restaurantData = response.data;

            console.log(text);
            setTimeout(() => {
                console.log("ssss");
                navigate(`/CSE442-542/2023-Fall/cse-442ae/build/Layout`, { state: { restaurant: text, restaurantData } });
            }, 300); 
        } catch (error) {
            // console.error("Error fetching restaurant data:", error);
            if (error.response) {
                
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                
                console.error("No response received:", error.request);
            } else {
                
                console.error("Error setting up request:", error.message);
            }
        }
    };

    
  

    return (
        <span onClick={handleClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {text}
        </span>
    );
};

export default ClickRestaurant;
