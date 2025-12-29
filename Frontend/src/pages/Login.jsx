import React, { useContext,useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext';
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoginContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:8080/api/v1/user/login',{
            email:email,
            password:password
        });
        if(res.data.success){
        localStorage.setItem("userId", res.data.user._id); 
      
        console.log("User Data:", res.data.user);
        
        // 2. Context update kar rahe hain
        setLoggedIn(true);
        
        // 3. Success message (optional)
        alert("Login Successful!");
        navigate('/');
        }
    } catch (error) {
        console.log(error);
    }
  };
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const handleOnChangeEmail = (e)=>{
    setEmail(e.target.value)
  }
  const handleOnChangePassword = (e)=>{
    setPassword(e.target.value)
  }
  return (
    <div style={{ padding: '20px' }}>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '250px' }}>
        <input type="email" placeholder='email' value={email} onChange={handleOnChangeEmail} required />
        <input type="password" placeholder='password' value={password} onChange={handleOnChangePassword} required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Login;