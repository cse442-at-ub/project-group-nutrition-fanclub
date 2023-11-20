import React, { useState, useEffect } from 'react';
import './Layout.css';
import axios from 'axios';

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
            <div className="tags">
                {restaurantData.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>
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
                            <p>{restaurantData.lastcontent}</p>
                            <button onClick={handleReviewClick} className="leave-review-btn">Leave my review</button>
                        </div>
                    )}
                    </div>
                
                <div className="images-layout">
                    {restaurantData.image.map((img, index) => (
                        <img key={index} src={img} alt={`restaurant-img-${index}`} />
                    ))}
                </div>
            </div>
        </div>

    );
}
export default Layout;