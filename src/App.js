
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import jwtDecode from "jwt-decode";
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import About from './components/About';
export default function App() {
  let [userData,setUserData]=useState(null);
  let navigate = useNavigate()
  function getUserData()
  {
    let decoded=jwtDecode(localStorage.getItem("userToken"));
    setUserData(decoded);
  }
  useEffect( ()=>{
     if(localStorage.getItem("userToken")){
      getUserData();
     }
  },[])
  
  function logout()
  {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  return (
   <div>
    <Navbar user={userData} logout={logout}/>
    <Routes>
    <Route element={<ProtectedRoute/>}>
        <Route path='/home' element={<Home/>} ></Route>
        <Route path='/about' element={<About/>} ></Route>

    </Route>
    
      <Route path='/register' element={<Register/>} ></Route>
      <Route path='/login' element={<Login getUserData={getUserData}/>} ></Route>
      

    </Routes>
   </div>
  )
}
