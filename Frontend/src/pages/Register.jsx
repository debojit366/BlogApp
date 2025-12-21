import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';

const Register = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoginContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Login Ho Gaya!");
    setLoggedIn(true);
    navigate('/');
  };
  return (
    <div style={{ padding: '20px' }}>
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '250px' }}>
        <input type="text" placeholder='username' required />
        <input type="email" placeholder='email' required />
        <input type="password" placeholder='password' required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Register;