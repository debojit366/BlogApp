import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/user/login', {
        email: email,
        password: password
      });
      
      if (res.data.success) {
        // 1. ID save kar rahe hain
        localStorage.setItem("userId", res.data.user._id);
        // 2. Navbar dikhane ke liye context update
        setLoggedIn(true);
        alert("Welcome Back!");
        navigate('/all-blogs');
      }
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    }
  };

  // --- Styles ---
  const containerStyle = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '380px',
    textAlign: 'center'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '20px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#1e3a8a', marginBottom: '8px' }}>Welcome Back</h2>
        <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '0.95rem' }}>
          Please enter your details to login
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input 
            type="email" 
            placeholder='Email Address' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={inputStyle} 
            required 
          />
          <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={inputStyle} 
            required 
          />
          
          <button 
            type='submit' 
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: '25px', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account? 
          <span 
            style={{ color: '#3b82f6', fontWeight: 'bold', cursor: 'pointer', marginLeft: '5px' }}
            onClick={() => navigate('/register')}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;