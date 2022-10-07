import React from 'react'
import { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { auth } from '../Firebase'
import {createUserWithEmailAndPassword} from'firebase/auth'
import {signInWithPopup, GoogleAuthProvider, updateProfile} from 'firebase/auth'
import { useLogin } from '../AuthContext'
import { user } from '../AuthContext'
import firebase from 'firebase/compat/app'

function SignUp() {
 const {isLoggedIn}= useLogin()
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')


  const update = {
    displayName: username
    
  };
  
  

  const handleRegister = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email,password)

    .then((res) => {
      
      navigate('/');
       firebase.auth().currentUser.updateProfile(update);

    })

    .catch(err => {alert(err.message)})

   
}


  const signInWithGoogle=()=>{
    const provider = new GoogleAuthProvider() 
    signInWithPopup(auth,provider)
    .then(res =>  {navigate('/')} )
    .catch(err => {alert(err.message)})
  }
  return (
    <div>
      <div className='div-sup'>
        <h3 className='head-4'>Sign up to B-Optics</h3>

        <p className='para-up'>*Full Name</p>
        <input className='inp-up' type='text' placeholder='Saber'  name='username' value={username}
        onChange={event => setUsername(event.target.value)}></input>

        <p className='para-up'>*Email</p>
        <input className='inp-up' type='email' placeholder='test@example.com' name='email' value={email}
        onChange={event => setEmail(event.target.value)}></input> 
        
        <p className='para-up'>*Password</p>
        <input className='inp-up' type='password' placeholder='Your password' name='password' value={password}
        onChange={event => setPassword(event.target.value)}></input>

        <button type='submit' className='btn-signup' onClick={handleRegister} >Sign Up</button>
      </div>

      <div className='div-or'>
        <h6 className='head-5'>OR</h6>
    
      </div>

      <div className='div-gbtn'>
      <button className='btn-gup' onClick={signInWithGoogle}>Continue with Google</button>
      </div>

      <div className='footer-para'>
        <p className='para-6'>Already have an account?</p>
      </div>
      <div className='footer-btn'>
      <Link to={'/signin'}>
      <button className='btn-inlink'>Sign In</button>
      </Link>
      </div>
    </div>
  )
}

export default SignUp
