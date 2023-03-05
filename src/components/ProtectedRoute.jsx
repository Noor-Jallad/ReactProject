import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
   if(!localStorage.getItem("userToken")){
       return <Navigate to='/login' />
    }
    else{
       return <Outlet />
    }
  
  
}
