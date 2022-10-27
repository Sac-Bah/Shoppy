import React, { useEffect, useState } from 'react'
import { auth } from '../Firebase'
import {signOut} from 'firebase/auth'
import { useLogin } from '../AuthContext'
import { Link,useNavigate } from 'react-router-dom'
import {  doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db} from '../Firebase'

function GuestNav() {
  const navigation= useNavigate()
  const{isLoggedIn}= useLogin()
  const [photoURL, setPhotoURL]= useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=")

  const[userData,setUserData]=useState(null)
  const [loading,setLoading]=useState(true)


  useEffect(()=>{
    if(isLoggedIn && isLoggedIn.photoURL){
    setPhotoURL(isLoggedIn.photoURL)
    }
  }, [isLoggedIn])  

  const getUser=async()=>{ 
    const userCollection= doc(db,'users',isLoggedIn.uid)
     await onSnapshot(userCollection,(doc)=>{
      console.log('user data =>',doc.data())
      setLoading(false)
      setUserData(doc.data())
    })
    }
   
    useEffect(()=>{
      getUser()
      },[]);
      if(loading){
        return <></>
      }
  
      

  function logout(){
    signOut(auth)
    .then(res => {navigation('/signup')})
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
          {isLoggedIn && <><span>{userData? userData.username:''}</span> &nbsp; <img className='profile' src={photoURL}></img></>}
        </a>

        <ul className="dropdown-menu">
            <li><a className="dropdown-item" href='http://localhost:3000/profile'>View Profile</a></li>
             <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
         </ul>
         </div>
 </nav>
    </div>
  )
}

export default GuestNav





