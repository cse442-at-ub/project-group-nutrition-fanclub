import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Layout.css';
import axios from 'axios';
import Star from './Star';

const imageContext = require.context('./images', false, /\.(jpg)$/);
const images = imageContext.keys().reduce((acc, key) => {
  acc[key] = imageContext(key);
  return acc;
}, {});

function Layout(){
    const location = useLocation();
    const restaurantDataFromLocation = location.state.restaurantData;
    const restaurantNameFromlocation = location.state.restaurant;

    const [showNotification, setShowNotification] = useState(false);

    const [restaurantData, setRestaurantData] = useState(restaurantDataFromLocation);



    const [restaurant, setRestaurant] = useState(restaurantNameFromlocation);

    const restaurantImage = images[`./${restaurant}.jpg`];
    const restaurantImage2 = images[`./${restaurant}2.jpg`];
    
    useEffect(() => {
        console.log('restaurantData updated:', restaurantData);
    }, [restaurantData]);

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


        if (localStorage.getItem("isLogin") === 'true'){
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
        } else {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 3000); 
        }
    };

    const handleSubmitReview = async () => {

        const getnewmean = ((restaurantData.rate * restaurantData.count) + parseFloat(userReview.rating)) / (restaurantData.count + 1);
        const newRate = parseFloat(getnewmean.toFixed(1));
        const newCount = restaurantData.count + 1;

        console.log("user review is :", userReview);


        try {
            const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Save_Comments.php', {
                username: userReview.username,
                rating: userReview.rating,
                comment: userReview.content,
                restaurant_name: restaurantData.name,
            });
            
            await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Save_new_rate.php', {
                name: restaurantData.name,
                rate: newRate,
                count: newCount,
            });


            if (response.data.message === "Comment added successfully") {
                localStorage.setItem(restaurantData.name, [userReview.content,'']);
                console.log("true")
                setRestaurantData(prevData => {
                    const newData = {
                        ...prevData,
                        lastPerson: userReview.username,
                        lastRating: userReview.rating,
                        lastContent: userReview.content
                    };
                    console.log('Updated state:', restaurantData);
                });
                

                setRestaurantData({
                    ...restaurantData,
                    lastPerson: userReview.username,
                    lastRating: userReview.rating,
                    lastContent: userReview.content,
                    rate: newRate,
                    count: newCount
                });
    

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
            {showNotification && <div className="notification">You need to Login first!</div>}
            <div className="restaurant-header">
                <h1>{restaurantData.name}</h1>
                <p>{restaurantData.address}</p>
                <div className="rating">
                    <Star score={restaurantData.rate} />
                    <span>{restaurantData.rate}</span>
                    <span>({restaurantData.count} reviews)</span>
                </div>
            </div>
            
            <div className="content-layout">
                <div className="review-layout">
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
                                    placeholder="Rating"
                                />
                            </div>
                            <div className="input-group">
                                <textarea
                                    value={userReview.content}
                                    onChange={e => setUserReview({...userReview, content: e.target.value})}
                                    className="content-input"
                                    placeholder="Leave your review"
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
                    <img src={restaurantImage} alt="..."  />
                    <img src={restaurantImage2} alt="..."  />
                </div>
            </div>
        </div>

    );
}
export default Layout;