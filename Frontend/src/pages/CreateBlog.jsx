import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const user = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/blog/create-blog', {
        ...formData,
        user: user
      });
      if (res.data.success) {
        alert("Blog Created Successfully!");
        navigate('/all-blogs'); // Create hone ke baad redirect
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // --- Styles ---
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '20px',
    backgroundColor: '#f9fafb'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '500px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0 20px 0',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#374151',
    alignSelf: 'flex-start'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e3a8a' }}>
          Create New Blog
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          
          <label style={labelStyle}>Blog Title</label>
          <input 
            type="text" 
            placeholder='What is your blog about?' 
            name='title' 
            onChange={handleChange} 
            value={formData.title} 
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Description</label>
          <textarea 
            placeholder='Tell your story...' 
            name='description' 
            onChange={handleChange} 
            value={formData.description} 
            style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
            required
          />

          <label style={labelStyle}>Image URL</label>
          <input 
            type="text" 
            placeholder='https://example.com/image.jpg' 
            name='image' 
            onChange={handleChange} 
            value={formData.image} 
            style={inputStyle}
            required
          />

          <button 
            type='submit' 
            style={buttonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;