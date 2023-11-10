import React from 'react';

const imageContext = require.context('./images', false, /\.(jpg)$/);
const images = imageContext.keys().reduce((acc, key) => {
  acc[key] = imageContext(key);
  return acc;
}, {});

function RestaurantCard({ restaurant }) {
  const restaurantImage = images[`./${restaurant}.jpg`];

  return (
    <div className="col">
      <div className="card">
        <img src={restaurantImage} className="card-img-top" alt="..." style={{ maxHeight: 'fit-content' }} />
        <div className="card-body">
          <h5 className="card-title">{restaurant}</h5>
          <p className="card-text"><small>REVIEW FROM {restaurant.reviewAuthor}</small></p>
          <p className="card-text">{restaurant.review}</p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
