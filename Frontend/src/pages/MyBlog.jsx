import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogCard from '../component/BlogCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const MyBlog = () => {
    const {userid} = useParams();
    const navigate = useNavigate();
    const isUserLoggedIn = localStorage.getItem("userId");
    const [blogs,setBlogs] = useState([]);
    const getuserBlogs = async ()=>{
        if(!isUserLoggedIn){
            console.log("user not logged in")
            navigate('/error')
        }
        console.log("function is running")
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${userid}`);
            console.log("res success",res.data)
            if(res.data.userBlog.blogs){
                setBlogs(res.data.userBlog.blogs);
                console.log(res.data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getuserBlogs();
    },[])
  return (
    <div>
        {blogs.map((blog)=>(
            <BlogCard 
            key = {blog._id}
            id = {blog._id}
            time = {blog.createdAt}
            title={blog.title} 
            description={blog.description}/>
        ))}
    </div>
  )
}

export default MyBlog