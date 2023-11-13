import React, { useState } from 'react';
import './Layout.css';

function Layout(){
    const RD = {
        name: "Sample Name",
        address: "Sample address",
        count: 68,
        rate: "3.0",
        tags: ["tag1","tag2","tag3","tag4","tag5"],
        lastPerson: "Sample User",
        lastRating: "2.0",
        lastcontent: "Overall the experience  I had at c3 was pretty terrible. I saw a rat inside the matzo ball soup and every single hand-sanitizer dispenser had nothing left. I did like the ice cream however",
        image: ["image1", "image2","image3"]
    };
    const [restaurantData, setRestaurantData] = useState(RD);


    return(
        <div className="restaurant-container">
            <h1>{restaurantData.name}</h1>
            <p>{restaurantData.address}</p>
            <div className="rating">
                <span>⭐️ {restaurantData.rate}</span>
                <span>({restaurantData.count} reviews)</span>
            </div>
            <div className="tags">
                {restaurantData.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
                ))}
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
        </div>
    );
}
export default Layout;
