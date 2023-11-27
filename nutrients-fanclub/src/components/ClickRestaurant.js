import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ClickRestaurant = ({ text }) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Return_Data.php', { restaurantName: text });
            const restaurantData = response.data;

            
            setTimeout(() => {
                history.push({
                    pathname: `/CSE442-542/2023-Fall/cse-442ae/build/Layout`,
                    state: { restaurant: text, restaurantData }
                });
            }, 300); 
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    
    if (isLoading) {
        return <span>Loading...</span>;
    }

    return (
        <span onClick={handleClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {text}
        </span>
    );
};

export default ClickRestaurant;
