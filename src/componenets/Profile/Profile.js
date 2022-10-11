import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../AuthContext'

function Profile() {
  const{isLoggedIn}= useLogin()
  const [photoURL, setPhotoURL]= useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=")

  
  useEffect(()=>{
    if(isLoggedIn && isLoggedIn.photoURL){
    setPhotoURL(isLoggedIn.photoURL)
    }
    
  }, [isLoggedIn])
  return (
    <div className='p-container'>

      <img className='p-cover' src='https://cdn.images.express.co.uk/img/dynamic/143/590x/No-Man-s-Sky-gets-alternative-covers-689362.jpg'/>
     
      <img className='p-dp' src={photoURL}/>
      <Link to={'/profile/edit'}>
     <button className='btn-editp'>Edit Profile</button> </Link>
     <h3 className='h-name'>{isLoggedIn.displayName}</h3>
     <p className='p-title-email'>Email</p>
     <p className='p-email'>{isLoggedIn.email}</p>
     <p className='p-title-address'>Address</p>
     <p className='p-address'>Address not set</p>
     <p className='p-title-mobile'>Mobile</p>
     <p>{isLoggedIn.phoneNumber}</p>
     <p className='p-title-date'>Date Joined</p>
     <p className='p-date'>{isLoggedIn.metadata.creationTime}</p>

    </div>
  )
}

export default Profile
