import React from 'react'
import axios from 'axios'
import { useEffect ,useState } from 'react'
import BlogCard from '../component/BlogCard'
const AllBlogs = () => {
  const [blogs,setBlogs] = useState([]);
  const getAllBlogs = async ()=>{
    try {
      const res = await axios.get("http://localhost:8080/api/v1/blog/all-blog");
      if(res.data.success){
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.message);
    }

  }
  useEffect(()=>{
    getAllBlogs()
  },[])
  return(
    <>
    <h1>These are all blogs</h1>
    {blogs.map((blog)=>(
      <BlogCard title = {blog.title} description={blog.description}/>
    ))}
    </>
  )
}

export default AllBlogs