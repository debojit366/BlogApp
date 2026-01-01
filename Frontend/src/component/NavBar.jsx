import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from '../context/LoginContext';
import { CircleUser } from 'lucide-react';
const Navbar = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userId");
  const profilePic = localStorage.getItem("profilePic"); 
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const handleLogoutButton = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("profilePic"); // Clear pic on logout
    setLoggedIn(false);
    navigate('/');
  };

  const handleMyBlog = () => navigate(`/my-blog/${userid}`);

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
  
  // Profile Icon Style
  const profileIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%', // Makes it a circle
    objectFit: 'cover', // Prevents stretching
    border: '2px solid #3b82f6',
    marginLeft: '15px',
    cursor: 'pointer'
  };

  if (!loggedIn) return null;

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 5%', // Reduced padding for height
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6', cursor: 'pointer' }} onClick={() => navigate('/')}>
        Blog<span style={{color: '#1e3a8a'}}>App</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button style={navBtn} onClick={handleMyBlog}>My Blogs</button>
        <button style={logoutBtn} onClick={handleLogoutButton}>Logout</button>
        <CircleUser 
          size={35} 
          color="#374151" 
          strokeWidth={1.5} 
          style={{ cursor: 'pointer', marginLeft: '5px' }}
          onClick={() => navigate(`/profile`)}
        />
      </div>
    </nav>
  );
};

export default Navbar;