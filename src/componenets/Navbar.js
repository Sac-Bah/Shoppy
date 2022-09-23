import React from 'react'

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
        
            <button className='btn-up'>Sign Up</button>
            <button className='btn-in'>Sign In</button>
        
        </nav>
    </div>
  )
}

export default Navbar
