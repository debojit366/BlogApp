import React, { useState } from 'react'
// const { title, description, image, user } = req.body;
import axios from 'axios'
const CreateBlog = () => {
    const user = localStorage.getItem("userId");
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        image:""
    });
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:8080/api/v1/blog/create-blog',{
                title:formData.title,
                description:formData.description,
                image:formData.image,
                user:user
            })
            if(res.data.success){
                alert("data send successfully")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = (e)=>{
        const {name , value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
  return (
    <>
    <div>CreateBlog Page</div>
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='enter title' name='title' onChange={handleChange} value={formData.title}/>
        <input type="text" placeholder='enter description' name='description' onChange={handleChange} value={formData.description}/>
        <input type="text" placeholder='enter image url' name='image' onChange={handleChange} value={formData.image}/>
        <button type='submit'>Submit</button>
    </form>
    </>
  )
}

export default CreateBlog