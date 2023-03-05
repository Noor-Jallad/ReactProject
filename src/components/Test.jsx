import React, { useState } from 'react'

export default function Test() {
    let [name,setName]=useState('')
    let [password,setPassword]=useState('')
    const submitHandle=(e)=>{
        e.preventDefault()
        console.log("Test")
        const user={name,password}
        console.log(user)
    }
    
  return (
    <>
       <form action="" onSubmit={submitHandle}>
        <label htmlFor="">Name</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        <label htmlFor="">Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <input type="submit" />
       </form>
    </>
  )
}
