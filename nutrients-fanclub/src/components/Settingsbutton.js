import React from 'react';

function Settingsbutton({ darkMode, toggleDarkMode }) {
  return (
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
  );
}

export default Settingsbutton;
