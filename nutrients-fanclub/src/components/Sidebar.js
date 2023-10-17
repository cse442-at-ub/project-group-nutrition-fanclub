import React from 'react';

function Sidebar() {
  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li style={{paddingTop: '20px'}}></li>
          <li><h4><a style={{color: '#2E6F57'}}>Filter by</a></h4></li>
          <hr></hr>
          <li><h5><a>Cuisine</a></h5></li>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck"></input>
            <label class="form-check-label" for="DefaultCheck">American</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck2"></input>
            <label class="form-check-label" for="DefaultCheck2">Chinese</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck3"></input>
            <label class="form-check-label" for="DefaultCheck3">Halal</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck4"></input>
            <label class="form-check-label" for="DefaultCheck4">Indian</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck5"></input>
            <label class="form-check-label" for="DefaultCheck5">Japanese</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck6"></input>
            <label class="form-check-label" for="DefaultCheck6">Korean</label>
          </div>
          <hr></hr>
          <li><h5><a>Food Options</a></h5></li>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck7"></input>
            <label class="form-check-label" for="DefaultCheck7">Boba</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck8"></input>
            <label class="form-check-label" for="DefaultCheck8">Breakfast</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck9"></input>
            <label class="form-check-label" for="DefaultCheck9">Pizza</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox"  value="" id="DefaultCheck10"></input>
            <label class="form-check-label" for="DefaultCheck10">Platter</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="DefaultCheck11"></input>
            <label class="form-check-label" for="DefaultCheck11">Noodles</label>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
