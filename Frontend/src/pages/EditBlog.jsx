import axios from 'axios';
import React, { useState,useEffect } from 'react'
// const { title, description, image } = req.body;
import { useNavigate, useParams } from 'react-router-dom'
const EditBlog = () => {
    const userId = localStorage.getItem('userId');
    const {blogId} = useParams();
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        image:""
    })
    const handleOnSubmit = async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:8080/api/v1/blog/update-blog/${blogId}`,{
                title:formData.title,
                description:formData.description,
                image:formData.image
            })
            if(res.data.success){
                navigate(`/my-blog/${userId}`)
            }
        } catch (error) {
            
        }
    }
    const onChangeForm = (e)=>{
        const {name , value} = e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
  return (
    <div>
        <h1>this is edit blog page</h1>
        <form  onSubmit = {handleOnSubmit} style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
            <input type="text" placeholder='title' name='title' value={formData.title} style={{width:'50vh'}} onChange={onChangeForm}/>
            <input type="text" placeholder='description' name='description' value={formData.description} style={{width:'50vh'}} onChange={onChangeForm}/>
            <input type="text" placeholder='image' name = 'image' value={formData.image} style={{width:'50vh'}} onChange={onChangeForm}/>
            <button type='submit' style={{width:'50vh'}}>Save Changes</button>
        </form>
    </div>
  )
}

export default EditBlog