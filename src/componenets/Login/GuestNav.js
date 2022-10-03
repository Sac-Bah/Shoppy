import React from 'react'
import { useAuth } from '../Firebase'
import { auth } from '../Firebase'
import {signOut} from 'firebase/auth'
import { useLogin } from '../AuthContext'


function GuestNav() {
  const{setIsLoggedIn}= useLogin()
  function logout(){
    signOut(auth)
    .then(res => setIsLoggedIn(false))
    .catch(err=> alert(err.message))
  }
  return (
    <div>
        <nav className='nav-m'>
            <a href='/'>
            <img className='logo' src="../images/logo.png"/>
            </a>
            <ul className='nav-ul'>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/'>Home</a></li>
              <li className='nav-link'><a className='links-a'href='http://localhost:3000/shop'>Shop</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/featured'>Featured</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/recommended'>Recommended</a></li>
            </ul>
          
            
            <input className='search-bar' type='text' placeholder='Search Product...'></input>
        <div className='dropdown'>
        <a className="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
          Name <img className='link-girl' src='./images/girl1.jpg'></img>
        </a>

        <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">View Profile</a></li>
             <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
         </ul>
         </div>
 </nav>
    </div>
  )
}

export default GuestNav





