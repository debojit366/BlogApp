import React from 'react';
import { useNavigate } from 'react-router-dom';
import AllBlogs from './AllBlogs';

const Home = () => {
  const navigate = useNavigate();
  // localStorage se userId check kar rahe hain
  const isLoggedIn = localStorage.getItem("userId");

  // --- Styles ---
  const heroSection = {
    minHeight: '100vh', 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: isLoggedIn ? 'flex-start' : 'center', // Logged in hai toh upar se shuru hoga
    alignItems: 'center',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: isLoggedIn ? '20px' : '0 20px',
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
      {isLoggedIn ? (
        /* --- Case 1: Logged In (Show Blogs) --- */
        <div style={{ width: '100%', maxWidth: '1200px' }}>
             <h2 style={{color: '#1e3a8a', marginBottom: '30px'}}>Welcome Back! Explore Blogs</h2>
             <AllBlogs />
        </div>
      ) : (
        /* --- Case 2: Not Logged In (Show Hero Page) --- */
        <>
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
          </div>

          <div style={{ marginTop: '50px', color: '#94a3b8', fontSize: '0.9rem' }}>
            Simple • Beautiful • Minimal
          </div>
        </>
      )}
    </div>
  );
};

export default Home;