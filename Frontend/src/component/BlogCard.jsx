import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ title, description, time, id, image }) => {
  const navigate = useNavigate();

  // --- Styled Objects ---
  const cardContainer = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '15px',
    overflow: 'hidden', // Taaki image corners rounded rahein
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    border: '1px solid #f0f0f0',
    cursor: 'default'
  };

  const imageWrapper = {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: '#e5e7eb'
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover' // Image ko stretch nahi hone dega
  };

  const contentStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const timeStyle = {
    fontSize: '0.85rem',
    color: '#9ca3af',
    fontWeight: '500'
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0',
    lineHeight: '1.4',
    // Text truncate logic: agar title bada hai toh "..." lag jayega
    display: '-webkit-box',
    WebkitLineClamp: '2',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const descStyle = {
    fontSize: '0.95rem',
    color: '#4b5563',
    lineHeight: '1.6',
    margin: '0',
    display: '-webkit-box',
    WebkitLineClamp: '3', // Sirf 3 line dikhayega
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const footerStyle = {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const editBtn = {
    padding: '6px 15px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    transition: '0.2s'
  };

  return (
    <div 
      style={cardContainer}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
      }}
    >
      {/* 1. Image Section */}
      <div style={imageWrapper}>
        <img 
          src={image || "https://via.placeholder.com/400x200?text=No+Image"} 
          alt={title} 
          style={imgStyle} 
        />
      </div>

      {/* 2. Content Section */}
      <div style={contentStyle}>
        <span style={timeStyle}>{new Date(time).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        
        <h3 style={titleStyle}>{title}</h3>
        
        <p style={descStyle}>{description}</p>

        <div style={footerStyle}>
          <button 
            style={editBtn} 
            onClick={() => navigate(`/edit-blog/${id}`)}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Edit Post
          </button>
          <span style={{color: '#3b82f6', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer'}}>Read More →</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;