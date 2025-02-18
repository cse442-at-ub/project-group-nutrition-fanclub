import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CleanerDashboard from './CleanerDashboard';
import EmployerDashboard from './EmployerDashboard';
import AdminDashboard from './AdminDashboard';

function Home() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Get the user's role from localStorage or an API
    const savedRole = localStorage.getItem('role');
    if (savedRole) {
      setRole(savedRole);
      console.log('Saved role:', savedRole);
    }
  }, []);

  if (!role) {
    return (
      <div style={containerStyle}>
        <h1 style={titleStyle}>Welcome to KeyswcoCleans</h1>
        <p style={subtitleStyle}>Reliable and Professional Cleaning Services</p>
        <div style={buttonContainerStyle}>
          <Link to="/signup">
            <button style={buttonStyle}>Sign Up</button>
          </Link>
          <Link to="/login">
            <button style={buttonStyle}>Sign In</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {role === 'cleaner' && <CleanerDashboard />}
      {role === 'employer' && <EmployerDashboard />}
      {role === 'admin' && <AdminDashboard />}
    </div>
  );
}

// Styles for the homepage when no role is found
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: '#f4f4f4',
};

const titleStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#2E6F57',
  marginBottom: '10px',
};

const subtitleStyle = {
  fontSize: '1.5rem',
  color: '#555',
  marginBottom: '30px',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '20px',
};

const buttonStyle = {
  padding: '12px 25px',
  fontSize: '1rem',
  backgroundColor: '#00AEEF',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  textDecoration: 'none',
  transition: 'background 0.3s',
};

buttonStyle[':hover'] = {
  backgroundColor: '#008ECF',
};

export default Home;
