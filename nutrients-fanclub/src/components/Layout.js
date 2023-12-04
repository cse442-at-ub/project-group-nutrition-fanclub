import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Layout.css';
import axios from 'axios';
import StarRating from './StarRating';

const imageContext = require.context('./images', false, /\.(jpg)$/);
const images = imageContext.keys().reduce((acc, key) => {
  acc[key] = imageContext(key);
  return acc;
}, {});

function Layout(){
    const location = useLocation();
    const restaurantDataFromLocation = location.state.restaurantData;
    const restaurantNameFromlocation = location.state.restaurant;

    const [restaurantData, setRestaurantData] = useState(restaurantDataFromLocation);
    console.log(restaurantData);
    const [restaurant, setRestaurant] = useState(restaurantNameFromlocation);

    const restaurantImage = images[`./${restaurant}.jpg`];
    const restaurantImage2 = images[`./${restaurant}2.jpg`];
    // const RD = {
    //     name: restaurant,
    //     address: "Sample address",
    //     count: 68,
    //     rate: "3.0",
    //     tags: ["tag1","tag2","tag3","tag4","tag5"],
    //     lastPerson: "Sample User",
    //     lastRating: "2.0",
    //     lastcontent: "Overall the experience  I had at c3 was pretty terrible. I saw a rat inside the matzo ball soup and every single hand-sanitizer dispenser had nothing left. I did like the ice cream however",
    //     image: ["image1", "image2","image3"]
    // };
    // const [restaurantData, setRestaurantData] = useState(RD);
    const [isReviewing, setIsReviewing] = useState(false);
    const [userReview, setUserReview] = useState({
        username: '',
        rating: '',
        content: ''
    });

    const handleReviewClick = async () => {
        const userEmail = localStorage.getItem('userEmail');
        try {
            const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Setting.php', {
                email: userEmail,
                action: "retrieve",
            });
            localStorage.setItem('userData', JSON.stringify(response.data));
            setUserReview({
                ...userReview,
                username: response.data.username,
            });
            setIsReviewing(true);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSubmitReview = async () => {
        try {
            const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Save_Comments.php', {
                username: userReview.username,
                rating: userReview.rating,
                comment: userReview.content,
                restaurant_name: restaurantData.name,
            });
            
            if (response.data.message === "Comment added successfully") {
                localStorage.setItem(restaurantData.name, [userReview.content,'']);
                console.log("true")
                setRestaurantData(prevData => ({
                    ...prevData,
                    lastPerson: userReview.username,
                    lastRating: userReview.rating,
                    lastcontent: userReview.content
                }));
    

                setUserReview({
                    username: '',
                    rating: '',
                    content: ''
                });
                setIsReviewing(false);
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error posting review:", error);
        }
    };


    return(
        <div className="restaurant-container">
            <h1>{restaurantData.name}</h1>
            <p>{restaurantData.address}</p>
            
            <div className="rating">
                <span>⭐️ {restaurantData.rate}</span>
                <span>({restaurantData.count} reviews)</span>
            </div>
            {/* <div className="tags">
                {restaurantData.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div> */}
            <div className="review-layout">
                <div className="review-content">
                    {isReviewing ? (
                        <>
                            <div className="input-group">
                                <input
                                    type="text"
                                    value={userReview.username}
                                    readOnly
                                    className="username-input"
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="number"
                                    value={userReview.rating}
                                    onChange={e => setUserReview({...userReview, rating: e.target.value})}
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    className="rating-input"
                                />
                            </div>
                            <div className="input-group">
                                <textarea
                                    value={userReview.content}
                                    onChange={e => setUserReview({...userReview, content: e.target.value})}
                                    className="content-input"
                                />
                            </div>
                            <button onClick={handleSubmitReview} className="post-review-btn">POST</button>
                        </>
                    ) : (

                        <div className="review-content">
                            <div className="user">{restaurantData.lastPerson}</div>
                            <div className="user-rating">{restaurantData.lastRating}</div>
                            <p>{restaurantData.lastContent}</p>
                            <button onClick={handleReviewClick} className="leave-review-btn">Leave my review</button>
                        </div>
                    )}
                    </div>
                
                <div className="images-layout">
                    <img src={restaurantImage} alt="..." style={{ maxHeight: 'fit-content', width: '200px', height: '200px' }} />
                    <img src={restaurantImage2} alt="..." style={{ maxHeight: 'fit-content', width: '200px', height: '200px' }} />
                </div>
            </div>
        </div>

    );
}
export default Layout;