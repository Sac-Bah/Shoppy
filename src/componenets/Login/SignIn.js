import React from 'react'
import { useState } from 'react'
import { auth } from '../Firebase'
import {signInWithEmailAndPassword} from'firebase/auth'
import { useNavigate } from 'react-router-dom'

function SignIn() {

  const navigation= useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const handleLogIn = (e) => {
      e.preventDefault()
        signInWithEmailAndPassword(auth,email,password)

        .then(res => {navigation('/')})

        .catch(error => {alert(error.message)})
    }

  return (
    <div>
      <div className='div-sup'>
        <h3 className='head-4'>Sign in to B-Optics</h3>

        <p className='para-up'>*Email</p>
        <input className='inp-up' type='email' placeholder='test@example.com' name='email'
        onChange={event => setEmail(event.target.value)}></input>
        
        <p className='para-up'>*Password</p>
        <input className='inp-up' type='password' placeholder='Your password' name='password'
        onChange={event => setPassword(event.target.value)}></input>

        <button className='btn-signup' onClick={handleLogIn}>Sign In</button>
      </div>

      <div className='div-or'>
        <h6 className='head-5'>OR</h6>
    
      </div>

      <div className='div-gbtn'>
      <button className='btn-gup'>Continue with Google</button>
      </div>

      <div className='footer-para'>
        <p className='para-6'>Don't have an account?</p>
      </div>
      <div className='footer-btn'>
      <button className='btn-inlink'>Sign Up</button>
      </div>
    </div>
  )
}

export default SignIn
