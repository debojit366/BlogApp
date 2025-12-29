import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogCard from '../component/BlogCard';
import axios from 'axios';

const MyBlog = () => {
  const { userid } = useParams();
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("userId");
  const [blogs, setBlogs] = useState([]);

  const getuserBlogs = async () => {
    if (!isUserLoggedIn) {
      navigate('/login'); // Error page se behtar hai login par bhejna
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${userid}`);
      if (res.data?.userBlog?.blogs) {
        setBlogs(res.data.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getuserBlogs();
  }, [userid]); // userid change hone par refresh ho

  // --- Styles ---
  const pageContainer = {
    padding: '40px 5%',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #e5e7eb',
    paddingBottom: '15px'
  };

  // CSS Grid for Blog Cards
  const gridContainer = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
    width: '100%'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    marginTop: '50px',
    color: '#6b7280',
    fontSize: '1.2rem'
  };

  return (
    <div style={pageContainer}>
      {/* Page Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={{ color: '#111827', margin: 0 }}>My Publications</h1>
          <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>Manage and edit your shared stories</p>
        </div>
        <button 
          onClick={() => navigate('/create-blog')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          + New Post
        </button>
      </div>

      {/* Blog Grid */}
      {blogs.length > 0 ? (
        <div style={gridContainer}>
          {blogs.map((blog) => (
            <BlogCard 
              key={blog._id}
              id={blog._id}
              isUser={true} // Taaki BlogCard ko pata chale ki Edit/Delete dikhana hai
              time={blog.createdAt}
              title={blog.title} 
              description={blog.description}
              image={blog.image} // Image bhi pass karein
            />
          ))}
        </div>
      ) : (
        <div style={emptyStateStyle}>
          <h3>No blogs found!</h3>
          <p>Start writing your first story today.</p>
        </div>
      )}
    </div>
  );
};

export default MyBlog;