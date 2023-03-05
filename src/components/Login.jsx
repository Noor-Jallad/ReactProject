import React, { useState } from "react";
import Joi from 'joi';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register(props) {
  // let navigate= useNavigate();
  let [user, setUser] = useState({ email:"", password: ""});
  let [errorList,setErrorList]=useState([]);
  let navigate= useNavigate();
  function getUserData(e) {
    let myUser = user;
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    console.log(user);
  }
  
  async function submitRegister(e)
  {
    e.preventDefault()
    // console.log(user)
    let validateResult=validateUser(user)
    console.log(validateResult)
    if(validateResult.error)
    {
        //list errors
        setErrorList(validateResult.error.details)
    }
    else{
        //Send data to backend
        console.log("ok")
        let {data}=await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",user);
        console.log(data)
        if(data.message==="success")
        {   localStorage.setItem("userToken",data.token);
        props.getUserData()
            navigate('/home')
        }
    }
   
  }
 function validateUser(user){
    let schema=Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })  ,
        age:Joi.number()
        .integer()
        .min(20)
        .max(80), 
        password:Joi.string().required()
        .pattern(new RegExp('^[A-Z][a-z]{3,8}$')).messages({
            "string.empty":"Password is empty,please fill it",
            "string.pattern.base":"Invalid Password Pattern"
        }),
     
    })
    return schema.validate(user,{abortEarly:false})
 }

  return (
    <>
    {errorList&&errorList.map((err,index)=>{return <div className="alert alert-danger">
            {err.message}
         </div>})}
      <div>Login Form</div>
      <form onSubmit={submitRegister}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={getUserData}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={getUserData}
          />
        </div>


        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
