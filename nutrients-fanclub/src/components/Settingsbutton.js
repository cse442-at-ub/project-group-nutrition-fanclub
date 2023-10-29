import React from 'react';
import { Link } from 'react-router-dom';

function Settingsbutton({ darkMode, toggleDarkMode }) {
  return (
    <Link to="/CSE442-542/2023-Fall/cse-442ae/build/Setting">
      <img
        src={"https://img.icons8.com/?size=200&id=3473&format=png"}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '999',
          width: '65px',
          height: '65px',
          cursor: 'pointer',
        }}
      />
    </Link>
  );
}

export default Settingsbutton;
