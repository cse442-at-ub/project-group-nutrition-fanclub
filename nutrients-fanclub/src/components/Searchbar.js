import React from 'react';

function Searchbar() {
  return (
    <div class="container-fluid" style={{ paddingTop: '10px' }}>
      <form class="d-flex">
        <div class="h4" style={{ whiteSpace: 'nowrap', paddingRight: 10}}>Find your campus grub!</div>
        <input class="form-control me-2 rounded-pill" type="search" placeholder="Search by name" aria-label="Search" />
        <button class="btn btn-outline-success rounded-pill" type="submit">Search</button>
      </form>
    </div>
  );
}

export default Searchbar;