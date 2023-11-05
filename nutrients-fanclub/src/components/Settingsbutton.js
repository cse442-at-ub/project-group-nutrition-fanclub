import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settingsbutton({ isLogin }) {
  const event = new Event('userDataUpdated');
  window.dispatchEvent(event);
  const navigate = useNavigate();
  
  const handleButtonClick = async () => {
    if (isLogin) {
      const userEmail = localStorage.getItem('userEmail');
      try {
        const response = await axios.post('https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ae/backend/Setting.php', {
          email: userEmail,
          action: "retrieve",
        });
        localStorage.setItem('userData', JSON.stringify(response.data));
        setTimeout(() => {
          navigate("/CSE442-542/2023-Fall/cse-442ae/build/Setting");
        }, 500);
        console.log(localStorage)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  return isLogin ? (
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
        onClick={handleButtonClick}
      />

  ) : null;
}

export default Settingsbutton;
