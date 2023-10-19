import React from 'react';

function Searchbar() {
  return (
    <div className="container-fluid" style={{ paddingTop: '10px'}}>
      <form className="d-flex">
        <div className='h3' style={{ whiteSpace: 'nowrap', paddingRight: 10, paddingLeft: 150, color: '#2E6F57' }}><a>Find your campus grub!</a></div>
        <input className="form-control me-1 rounded-pill" type="search" placeholder="Search by name" aria-label="Search" />
        <button className="btn btn-outline-success rounded-pill" type="submit">Search</button>
      </form>
    </div>
  );
}

export default Searchbar;