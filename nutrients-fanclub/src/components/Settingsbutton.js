import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Settingsbutton({ isLogin }) {
  const handleButtonClick = async () => {
    if (isLogin) {
      const userEmail = localStorage.getItem('userEmail');
      try {
        const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Setting.php', {
          email: userEmail,
          action: "retrieve",
        });
        localStorage.setItem('userData', JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return isLogin ? (
    <Link to="/CSE442-542/2023-Fall/cse-442ae/build/Setting" onClick={handleButtonClick}>
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
  ) : null;
}

export default Settingsbutton;
