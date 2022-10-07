import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../AuthContext'

function EditProfile() {
  const{isLoggedIn}= useLogin()
  const [photoURL, setPhotoURL]= useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=")


  useEffect(() => {
     if(isLoggedIn && isLoggedIn.photoURL){
        setPhotoURL(isLoggedIn.photoURL)
      }
    }, [isLoggedIn])
     
  return (
    <div>
        <h2 className='h-etitle'>Edit Account Details</h2>
    <div className='p-econtainer'>
      <img className='p-cover' src='https://cdn.images.express.co.uk/img/dynamic/143/590x/No-Man-s-Sky-gets-alternative-covers-689362.jpg'/>
     
      <img className='p-dp' src={photoURL}/>
    <label htmlFor='edit-cover'>
        <input type='file'  hidden id='edit-cover'  ></input> 
        <p className='inp-cover'>🖍</p>
     </label>
     <div className='div-lbl'>
        <label htmlFor='edit-dp'>
        <input  type='file'  hidden id='edit-dp'  ></input> 
        <p className='inp-dp'>🖍</p>
        </label>
     </div>
     <p className='p-title-name'>* Full name</p>
     <input type='text' className='inp-ename' value={isLoggedIn.displayName}></input>
     <p className='p-title-email'>* Email Address</p>
     <input type='text' className='inp-e-email' disabled placeholder={isLoggedIn.email} ></input>
     <p className='p-title-address'>Address (Will be used for checkout)</p>
     <input type='text' className='inp-eaddress' placeholder='H.1 St.3, Lahore Cantt, Punjab, Pakistan'></input>
     <p className='p-title-mobile'>Mobile Number (Will be used for checkout)</p>
     <input type='tel' className='inp-enum' placeholder='+92'></input>
     <Link to={'/profile'}>
     <button className='btn-back'>Back to Profile</button> </Link>
     <button className='btn-updt'>Update Profile</button>
     </div>
    </div>
  )
  }

export default EditProfile
