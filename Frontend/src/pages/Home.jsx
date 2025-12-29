import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userId");

  // --- Styles ---
  const heroSection = {
    height: '100vh', // Poori screen cover karega kyunki navbar nahi hai
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '0 20px',
  };

  const titleStyle = {
    fontSize: '4.5rem',
    fontWeight: '800',
    color: '#1e3a8a',
    marginBottom: '10px',
    letterSpacing: '-2px'
  };

  const buttonGroup = {
    display: 'flex',
    gap: '15px',
    marginTop: '20px'
  };

  const primaryBtn = {
    padding: '15px 35px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
    transition: '0.3s',
  };

  const outlineBtn = {
    padding: '15px 35px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '50px',
    border: '2px solid #3b82f6',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: '#3b82f6',
    transition: '0.3s',
  };

  return (
    <div style={heroSection}>
      <h1 style={titleStyle}>
        Blog<span style={{ color: '#3b82f6' }}>App</span>
      </h1>
      
      <p style={{ fontSize: '1.5rem', color: '#1e3a8a', fontWeight: '500', marginBottom: '10px' }}>
        Where words create worlds.
      </p>

      <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '500px', marginBottom: '30px', lineHeight: '1.6' }}>
        A simple and elegant platform to share your thoughts with the world. 
        Start your blogging journey today.
      </p>

      <div style={buttonGroup}>
        {isLoggedIn ? (
          /* Agar login hai toh seedha dashboard */
          <button 
            style={primaryBtn}
            onClick={() => navigate('/all-blogs')}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Go to Dashboard
          </button>
        ) : (
          /* Agar login nahi hai toh dono options */
          <>
            <button 
              style={primaryBtn}
              onClick={() => navigate('/register')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Join Now
            </button>
            <button 
              style={outlineBtn}
              onClick={() => navigate('/login')}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#3b82f6';
              }}
            >
              Sign In
            </button>
          </>
        )}
      </div>

      {/* Subtle background element */}
      <div style={{ marginTop: '50px', color: '#94a3b8', fontSize: '0.9rem' }}>
        Simple • Beautiful • Minimal
      </div>
    </div>
  );
};

export default Home;