import React from 'react';

function Restaurants() {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4" style={{ padding: '2%' }}>
      <div className="col">
        <div className="card">
          <img src="https://lh3.googleusercontent.com/p/AF1QipP5GR5miR3USPUEfvjO2tafEjSPd9DXPv8pFx3N=s1360-w1360-h1020" className="card-img-top" alt="..." style={{ maxHeight: 'fit-content' }} />
          <div className="card-body">
            <h5 className="card-title">Dancing Chopsticks</h5>
            <p className="card-text"><small>REVIEW FROM YUNGCHOWDER</small></p>
            <p className="card-text">“The food here is alright; the platters aren’t super expensive and there are a lot of options. They’re also open until later than other places, so I come here often to get food.”</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <img src="https://ubdining.com/modules/custom/locations/images/locations/crossroads_culinary_center.png" className="card-img-top" alt="..." style={{ maxHeight: 'fit-content' }} />
          <div className="card-body">
            <h5 className="card-title">Crossroads Culinary Center</h5>
            <p className="card-text"><small>REVIEW FROM C4ISDABOMB</small></p>
            <p className="card-text">“I feel like the quality of the food might have gone down as time went on, but this is still the most convenient spot to go to when I want to quickly pick something up and go.”</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <img src="https://images.squarespace-cdn.com/content/v1/580527219f745638d192141a/1548292570546-KF3UT6G2X2SEDE37NVVF/image-asset.jpeg" className="card-img-top" alt="..." style={{ maxHeight: 'fit-content' }} />
          <div className="card-body">
            <h5 className="card-title">Sizzles</h5>
            <p className="card-text"><small>REVIEW FROM TAEKWONDOSTAN</small></p>
            <p className="card-text">“The seasoned cajun fries here are so bussin that I always come here. Whenever I feel down, the fries always lift me back up. 10/10 best Ellicott restaurant for sure.”</p>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card h-100">
          <img src="https://assets.entrepreneur.com/content/3x2/2000/1678134404-0323-FastestGrowing-KungFuTeacopy.jpg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Kung Fu Tea</h5>
            <p className="card-text"><small>REVIEW FROM LUJKIM</small></p>
            <p className="card-text">"I always come here to get boba. The boba here is a little expensive, but I still always splurge to treat myself. My favorite drink to get is the Brown Sugar Milk Tea." </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
