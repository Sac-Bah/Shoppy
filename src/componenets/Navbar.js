import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='nav-div'>
        <nav className='nav-m'>
         
            <img className='logo' src="../images/logo.png"/>
            <ul className='nav-ul'>
              <li className='nav-link'><a href='http://localhost:3000/'>Home</a></li>
              <li className='nav-link'><a href='http://localhost:3000/shop'>Shop</a></li>
              <li className='nav-link'><a href='http://localhost:3000/featured'>Featured</a></li>
              <li className='nav-link'><a href='http://localhost:3000/recommended'>Recommended</a></li>
            </ul>
          
            
            <input className='search-bar' type='text' placeholder='Search Product...'></input>

          <Link to={'/signup'}>
            <button className='btn-up'>Sign Up</button>
          </Link>
          
          <Link to={'/signin'}>
            <button className='btn-in'>Sign In</button>
            </Link>
        </nav>
    </div>
  )
}

export default Navbar
