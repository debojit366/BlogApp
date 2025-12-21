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
  const handleMyBlog = ()=>{
    navigate('/my-blog')
  }
  const handleAllBlog = ()=>{
    navigate('/all-blogs')
  }
  return (
    <nav >
      <div >BlogApp</div>
      {!loggedIn ? <><button onClick={handleLoginButton}>Login</button>
       <button onClick={handleRegisterButton}>Register</button>
       </>
         : <>
         <button onClick={handleLogoutButton}>Logout</button>
         <button onClick={handleMyBlog}>My Blog</button>
       <button onClick={handleAllBlog}>All Blog</button>
         </>}
    </nav>
  );
};

export default Navbar;