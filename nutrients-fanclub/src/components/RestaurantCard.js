import React from 'react';

function RestaurantCard({ restaurant }) {
  return (
    <div className="col">
      <div className="card">
        <img src={restaurant.image} className="card-img-top" alt="..." style={{ maxHeight: 'fit-content' }} />
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
