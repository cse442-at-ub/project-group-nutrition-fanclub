import React from 'react';

function Searchbar() {
  return (
    <div className="container-fluid">
      <div style={{ paddingTop: '10px' }}></div>
      <h4>Find your campus grub!</h4>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search by name" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  );
}

export default Searchbar;