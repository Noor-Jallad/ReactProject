import React, { useState } from "react";
import Joi from 'joi';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  // let navigate= useNavigate();
  let [user, setUser] = useState({ name: "", email: "", password: "",cPassword:'', age: 0 });
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
        // console.log("ok")
        let {data}=await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",user);
        // console.log(data);
        if(data.message==="success")
        {
         navigate('/login')
        }

    }
   
  }
 function validateUser(user){
    let schema=Joi.object({
        name:Joi.string()
        .min(3)
        .max(30)
        .required(),
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
        cPassword:Joi.valid(Joi.ref('password')).required()
    })
    return schema.validate(user,{abortEarly:false})
 }

  return (
    <>
    {errorList.map((err,index)=>{return <div className="alert alert-danger">
            {err.message}
         </div>})}
      <div>Register Form</div>
      <form onSubmit={submitRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            onChange={getUserData}
          />
        </div>

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
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
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

        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Repeat-Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cPassword"
            name="cPassword"
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
