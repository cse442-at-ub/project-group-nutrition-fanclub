import React from 'react';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating); 
    const halfStar = rating % 1 !== 0; 
    const emptyStars = Math.floor(5 - rating); 

    return (
        <div>
            {[...Array(fullStars)].map((_, index) => (
                <span key={index}>★</span> 
            ))}
            {halfStar && <span>½</span>} 
            {[...Array(emptyStars)].map((_, index) => (
                <span key={index}>☆</span> 
            ))}
        </div>
    );
};

export default StarRating;
