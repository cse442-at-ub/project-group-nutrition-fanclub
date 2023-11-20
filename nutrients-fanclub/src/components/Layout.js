import React, { useState, useEffect } from 'react';
import './Layout.css';
import axios from "axios";

function Layout(){
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const userEmail = localStorage.getItem('useremail');
    const RD = {
        restaurant_name: "Sample Name",
        address: "Sample address",
        count: 68,
        average_rating: "3.0",
        lastPerson: "Sample User",
        lastRating: "2.0",
        lastcontent: "",
        image: ["image1", "image2", "image3"]
    };
    const [restaurantData, setRestaurantData] = useState(RD);

    const sendReview = () => {
        if (!comment || !rating) {
            console.error('Comment and rating are required');
            return;
        }

        const data = {
            restaurant_id: restaurantData.restaurant_name,
            user_id: userEmail,
            comment: comment,
            rating: rating,
        };

        axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/reviews.php', data)
            .then((response) => {
                console.log('Review submitted successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error submitting review:', error);
            });
    };

    useEffect(() => {
        // Fetch restaurant data from the server
        axios.get('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/reviews.php')
            .then((response) => {
                const data = response.data;

                if (data.status === 1) {
                    setRestaurantData({
                        restaurant_name: data.restaurantID,
                        address: data.address,
                        count: data.count,
                        average_rating: data.average_rating,
                        tags: data.tags,
                        lastPerson: data.lastPerson,
                        lastRating: data.lastRating,
                        lastcontent: data.lastcontent,
                        image: data.image,
                    });
                } else {
                    console.error('Failed to fetch restaurant data:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching restaurant data:', error);
            });
    }, []); // Empty dependency array means this effect runs once after the initial render

    return(
        <div className="restaurant-container">
            <h1>{restaurantData.restaurant_name}</h1>
            <p>{restaurantData.address}</p>
            <div className="rating">
                <span>⭐️ {restaurantData.average_rating}</span>
                <span>({restaurantData.count} reviews)</span>
            </div>
                <div className="reviews">
                <div className="user">{restaurantData.lastPerson}</div>
                <div className="user-rating">{restaurantData.lastRating}</div>
                <p>{restaurantData.lastcontent}</p>
            </div>
            <div className="images">
                {restaurantData.image.map((img, index) => (
                <img key={index} src={img} alt={`restaurant-img-${index}`} />
                ))}
            </div>
            <div className="comment">
                <label for="comment_box">Comment: 
                    <input
                        id="comment_box"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </label>
                <span style={{padding:3}}/>
                <label for="rating_box">Rating:
                    <input
                        type="number"
                        min="0"
                        max="5"
                        id="rating_box"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
                <span style={{padding:3}}/>
                <button className="btn btn-primary" onClick={sendReview}>Submit</button>
            </div>
        </div>
    );
}
export default Layout;