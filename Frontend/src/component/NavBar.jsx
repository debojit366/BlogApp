import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
const Navbar = () => {
  const navigate = useNavigate();
  const {loggedIn , setLoggedIn} = useContext(LoginContext)
  const handleLoginButton = ()=>{
    navigate('/login')
  }
  const handleLogoutButton = ()=>{
    navigate('/')
  }
  const handleRegisterButton = ()=>{
    navigate('/register')
  }
  return (
    <nav >
      <div >BlogApp</div>
      {!loggedIn ? <><button onClick={handleLoginButton}>Login</button> <button onClick={handleRegisterButton}>Register</button></>  : <button onClick={handleLogoutButton}>Logout</button>}
    </nav>
  );
};

export default Navbar;