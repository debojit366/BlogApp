import { useState } from 'react'
import NavBar from './component/NavBar.jsx'
import {Route , Routes} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/login.jsx'
import { LoginContext } from './context/LoginContext.js'
function App() {
  const [loggedIn , setLoggedIn] = useState(false);
  return (
    <>
      <LoginContext.Provider value = {{loggedIn,setLoggedIn}}>
        <NavBar/>
      <Routes>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
      </Routes>
      </LoginContext.Provider>
    </>
  )
}

export default App
