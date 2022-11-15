import React from 'react'
import { useState } from 'react'
import { auth, db } from '../Firebase'
import { useDispatch, useSelector } from 'react-redux'
import {signInWithEmailAndPassword} from'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { loginInitiate,gsiInitiate } from 'Redux/Action'

function SignIn() {
 
  const navigation= useNavigate()
  const [state,setState]=useState({
    email:'',
    password:''
  })

  const {currentUser}= useSelector((state) => state.user)
  const dispatch = useDispatch()
  const {email,password}=state
    // const [email,setEmail] = useState('')
    // const [password,setPassword] = useState('')

    const handleChange = (e) => {
      let {name,value}= e.target
      setState({...state, [name]:value})
    }
    
    const handleLogIn = (e) => {
      e.preventDefault()
        dispatch(loginInitiate(email,password))
        navigation('/')
        setState({email:'', password:''})
    }

    const signInWithGoogle=()=>{
      dispatch(gsiInitiate()).then(()=>
      navigation('/'))
    }
  return (
    <div>
      <div className='div-sup'>
        <h3 className='head-4'>Sign in to B-Optics</h3>

        <p className='para-up'>*Email</p>
        <input className='inp-up' type='email' placeholder='test@example.com' name='email' value={email}
        onChange={handleChange}></input>
        
        <p className='para-up'>*Password</p>
        <input className='inp-up' type='password' placeholder='Your password' name='password' value={password}
        onChange={handleChange}></input>

        <button className='btn-signup' onClick={handleLogIn}>Sign In</button>
      </div>

      <div className='div-or'>
        <h6 className='head-5'>OR</h6>
    
      </div>

      <div className='div-gbtn'>
      <button className='btn-gup' onClick={signInWithGoogle}>Continue with Google</button>
      </div>

      <div className='footer-para'>
        <p className='para-6'>Don't have an account?</p>
      </div>
      <div className='footer-btn'>
        <Link to={'/signup'}>
      <button className='btn-inlink'>Sign Up</button>
      </Link>
      </div>
    </div>
  )
}

export default SignIn
