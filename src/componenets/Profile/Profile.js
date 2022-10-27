import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../AuthContext'
import {  doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db} from '../Firebase'

function Profile() {
  const{isLoggedIn}= useLogin()
  const [photoURL, setPhotoURL]= useState(isLoggedIn.photoURL)
  const[userData,setUserData]=useState(null)
  const [loading,setLoading]=useState(true)

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
   

 
    
  useEffect(()=>{
    if(isLoggedIn && isLoggedIn.photoURL){
    setPhotoURL(isLoggedIn.photoURL)
    }else(
      setPhotoURL('https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=')
    )
    
  }, [isLoggedIn])
  if(loading){
    return <></>
  }
  return (
    <div className='p-container'>

      <img className='p-cover' src={userData.coverPhoto||'../images/cover.jpg'}/>
     
      <img className='p-dp' src={photoURL}/>
      <Link to={'/profile/edit'}>
     <button className='btn-editp'>Edit Profile</button> </Link>
     <h3 className='h-name'>{userData.username||'Write your name here'}</h3>
     <p className='p-title-email'>Email</p>
     <p className='p-email'>{isLoggedIn.email}</p>
     <p className='p-title-address'>Address</p>
    {userData ?  <p className='p-email'>{userData.address}</p> : <p className='p-address'>'Address not set'</p>}
     <p className='p-title-mobile'>Mobile</p>
     <p className='p-email'>{userData.phoneNumber||''}</p>
     <p className='p-title-date'>Date Joined</p>
     <p className='p-date'>{isLoggedIn.metadata.creationTime}</p>

    </div>
  )
}

export default Profile
