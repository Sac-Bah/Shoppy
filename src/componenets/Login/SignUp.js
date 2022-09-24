import React from 'react'

function SignUp() {
  return (
    <div>
      <div className='div-sup'>
        <h3 className='head-4'>Sign Up to B-Optics</h3>

        <p className='para-up'>*Full Name</p>
        <input className='inp-up' type='text' placeholder='Saber'></input>

        <p className='para-up'>*Email</p>
        <input className='inp-up' type='email' placeholder='test@example.com'></input>
        
        <p className='para-up'>*Password</p>
        <input className='inp-up' type='password' placeholder='Your password'></input>

        <button className='btn-signup'>Sign Up</button>
      </div>
      <div className='footer-sup'>

      </div>
    </div>
  )
}

export default SignUp
