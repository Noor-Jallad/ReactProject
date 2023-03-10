import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {
        props.user?<><ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/home">Home</Link>
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/portfolio">Portfolio</Link>
        </li>
      </ul>
      </>:null
      }
    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/home">Home</Link>
        </li>
      
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/portfolio">Portfolio</Link>
        </li>
      </ul> */}
   
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {props.user==null? <><li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li></>:null}
       
      {props.user?<>
        <li className="nav-item">
          <span className="nav-link" onClick={props.logout}>Logout</span>
        </li>
      </>:null}
      
      </ul>
   
    </div>
  </div>
</nav>




    </>
  )
}
