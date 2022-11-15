import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../Firebase'
import {createUserWithEmailAndPassword} from'firebase/auth'
import {signInWithPopup, GoogleAuthProvider, updateProfile} from 'firebase/auth'
import { useLogin } from '../AuthContext'
import firebase from 'firebase/compat/app'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import {gsiInitiate, signupInitiate} from '../../Redux/Action'

function SignUp() {
 const {isLoggedIn}= useLogin()
  const navigate = useNavigate()
  const [state,setState]=useState({
    email:'',
    password:'',
    username:''
  })
  // const [email,setEmail] = useState('')
  // const [password,setPassword] = useState('')
  // const [username,setUsername] = useState('')




const {currentUser}= useSelector((state) => state.user)
const dispatch = useDispatch()
const {email,username,password}=state

// useEffect(()=>{
//   if(currentUser){
   
//   }
// }, [currentUser, navigate])


  const handleChange = (e) => {
    let {name,value}= e.target
    setState({...state, [name]:value})
  }
  
//  const update = {
//   displayName: username
//  }

const handleRegister=(e)=>{
  e.preventDefault()
  dispatch(signupInitiate(email,password,username))
  navigate('/')
  setState({email:'', password:'', username:''})

}

  // const handleRegister = (e) => {
  //   e.preventDefault()
  //   createUserWithEmailAndPassword(auth, email,password)
  //     .then(async (res) => {
  //       firebase.auth().currentUser.updateProfile(update)
  //       await setDoc(doc(db,'users', res.user.uid), {username, email, timeStamp: serverTimestamp(), address:"", phoneNumber:"", coverPhoto:'', profilePhoto:res.user.photoURL})    
  //       navigate('/')
  //     })
  //     .catch(err => {alert(err.message)})
  // }


  const signInWithGoogle=()=>{
    dispatch(gsiInitiate())
    navigate('/')
  }
  return (
    <div>
      <div className='div-sup'>
        <h3 className='head-4'>Sign up to B-Optics</h3>

        <p className='para-up'>*Full Name</p>
        <input className='inp-up' type='text' placeholder='Saber'  name='username' value={username}
        onChange={handleChange}></input>

        <p className='para-up'>*Email</p>
        <input className='inp-up' type='email' placeholder='test@example.com' name='email' value={email}
        onChange={handleChange}></input> 
        
        <p className='para-up'>*Password</p>
        <input className='inp-up' type='password' placeholder='Your password' name='password' value={password}
        onChange={handleChange}></input>

        <button type='submit' className='btn-signup' onClick={handleRegister} >Sign Up</button>
      </div>

      <div className='div-or'>
        <h6 className='head-5'>OR</h6>
    
      </div>

      <div className='div-gbtn'>
      <button className='btn-gup'  onClick={signInWithGoogle}>Continue with Google</button>
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
