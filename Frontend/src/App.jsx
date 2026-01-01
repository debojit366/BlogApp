import { useEffect, useState } from 'react'
import NavBar from './component/NavBar.jsx'
import {Route , Routes, useLocation} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/login.jsx'
import { LoginContext } from './context/LoginContext.js'
import AllBlogs from './pages/AllBlogs.jsx'
import MyBlog from './pages/MyBlog.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import CreateBlog from './pages/CreateBlog.jsx'
import EditBlog from './pages/EditBlog.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
function App() {
  const [loggedIn , setLoggedIn] = useState(localStorage.getItem("userId") ? true : false);
  const location = useLocation();
  return (
    <>
      <LoginContext.Provider value = {{loggedIn,setLoggedIn}}>
        {location.pathname != '/error' && <NavBar/>}
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
        <Route path = '/all-blogs' element={<AllBlogs/>}/>
        <Route path = '/my-blog/:userid' element={<MyBlog/>}/>
        <Route path = '/error' element={<ErrorPage/>}/>
        <Route path = '/create-blog' element={<CreateBlog/>}/>
        <Route path = '/edit-blog/:blogId' element={<EditBlog/>}/>
        <Route path = '/profile' element={<Profile/>}/>
      </Routes>
      </LoginContext.Provider>
    </>
  )
}

export default App
