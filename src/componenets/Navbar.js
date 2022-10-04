
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import SignIn from './Login/SignIn'
import GuestNav from './Login/GuestNav'
import { useLogin } from './AuthContext'

function Navbar() {

  return (
    <div className='nav-div'>
        <nav className='nav-m'>
        <Link to={'/home'}>
            <img className='logo' src="../images/logo.png"/>
           </Link>
            <ul className='nav-ul'>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/home'>Home</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/shop'>Shop</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/featured'>Featured</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/recommended'>Recommended</a></li>
            </ul>
          
            
            <input className='search-bar' type='text' placeholder='Search Product...'></input>

           <Link to={'/signup'}>
           <button  className='btn-up'>Sign Up</button>
          </Link>
          
          <Link to={'/signin'}>
            <button  className='btn-in'>Sign In</button>
            </Link>

        </nav>
    </div>
  )
}

const NavRoute=()=> {
  
  const {isLoggedIn}= useLogin()
 
  return    isLoggedIn ? <GuestNav/>: <Navbar/> 
      

  
}

export default NavRoute
