import React from 'react';
import { useNavigate } from 'react-router-dom';
const BlogCard = ({ title, description, time , id }) => {
  const Navigate = useNavigate();
  // Styles as Objects
  const cardStyle = {
    width: '350px',
    margin: '20px',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
    border: '1px solid #e0e0e0',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '10px',
    textTransform: 'capitalize',
  };

  const descStyle = {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
  };

  return (
    <div style={cardStyle} 
         onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
         onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
    >
      <div style={titleStyle}>
        {title}
      </div>
      <div style={descStyle}>
        {description}
      </div>
      <div style={descStyle}>
        {time}
      </div>
      <button style={{
        marginTop: '15px',
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }} onClick={()=>Navigate(`/edit-blog/${id}`)}> edit
      </button>
    </div>
  );
};

export default BlogCard;