import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useLocation } from 'react-router-dom';
const Navbar = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userId");
  const location = useLocation();
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const handleLoginButton = () => navigate('/login');
  const handleLogoutButton = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
    navigate('/');
  };
  const handleRegisterButton = () => navigate('/register');
  const handleMyBlog = () => navigate(`/my-blog/${userid}`);
  const handleAllBlog = () => navigate('/all-blogs');

  // Common Button Style
  const btnStyle = {
    padding: '8px 16px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
    transition: '0.3s',
  };

  const primaryBtn = { ...btnStyle, backgroundColor: '#3b82f6', color: 'white' };
  const logoutBtn = { ...btnStyle, backgroundColor: '#ef4444', color: 'white' };
  const navBtn = { ...btnStyle, backgroundColor: '#f3f4f6', color: '#374151' };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 5%',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        fontSize: '1.5rem', 
        fontWeight: 'bold', 
        color: '#3b82f6', 
        cursor: 'pointer' 
      }} onClick={() => navigate('/')}>
        Blog<span style={{color: '#1e3a8a'}}>App</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {!loggedIn ? (
          <>
            <button style={navBtn} onClick={handleLoginButton}>Login</button>
            <button style={primaryBtn} onClick={handleRegisterButton}>Register</button>
          </>
        ) : (
          <>
            <button style={navBtn} onClick={handleAllBlog}>All Blogs</button>
            <button style={navBtn} onClick={handleMyBlog}>My Blogs</button>
            <button style={logoutBtn} onClick={handleLogoutButton}>Logout</button>
          </>
        )}
        {loggedIn && location.pathname.includes('/my-blog') && (
          <button style={navBtn} onClick={()=>navigate('/create-blog')}>Create Blog</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;