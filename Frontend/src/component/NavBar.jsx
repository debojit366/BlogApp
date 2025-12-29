import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userid = localStorage.getItem("userId");
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const handleLogoutButton = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
    navigate('/');
  };

  const handleMyBlog = () => navigate(`/my-blog/${userid}`);
  const handleAllBlog = () => navigate('/all-blogs');

  // Styles
  const btnStyle = {
    padding: '8px 16px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
    transition: '0.3s',
  };

  const logoutBtn = { ...btnStyle, backgroundColor: '#ef4444', color: 'white' };
  const navBtn = { ...btnStyle, backgroundColor: '#f3f4f6', color: '#374151' };
  const createBtn = { ...btnStyle, backgroundColor: '#10b981', color: 'white' };

  // --- LOGIC: Agar loggedIn false hai, toh 'null' return karo ---
  // Isse Navbar render hi nahi hoga
  if (!loggedIn) {
    return null;
  }

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
        <button style={navBtn} onClick={handleMyBlog}>My Blogs</button>

        <button style={logoutBtn} onClick={handleLogoutButton}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;