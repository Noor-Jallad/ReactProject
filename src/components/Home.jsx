import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Home() {
  let [count,setCount]=useState(0);

  useEffect( ()=>{
     console.log("Component did mount");

     return ()=>{
     console.log("Component will unmount");
      
     }
  },[]);

  useEffect( ()=>{
    if(count==0) return;
    else
    {console.log(count);
    console.log("Component did update");}
 },[count]);





  return (
    <>
    <div>Home</div>
    <h2>Count is: {count}</h2>
    <button type='button' className='btn btn-secondary' onClick={()=>setCount(5)}>Click</button>

    </>
  
  )
}
