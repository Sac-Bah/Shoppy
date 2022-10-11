import { updateCurrentUser } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../AuthContext'
import { upload } from '../AuthContext'
import firebase from 'firebase/compat/app'
import { auth } from '../Firebase'
import { updateProfile} from 'firebase/auth'
import Profile from './Profile'

function EditProfile() {
  const navigation = useNavigate()

  const{isLoggedIn}= useLogin()
  const [photoURL, setPhotoURL]= useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=")
  const [dp, setDp]=useState(isLoggedIn.photoURL)
  const [loading, setLoading]=useState(false)
  const [coverPhoto, setCoverPhoto]= useState('https://cdn.images.express.co.uk/img/dynamic/143/590x/No-Man-s-Sky-gets-alternative-covers-689362.jpg')
  const [newUserName, setNewUserName]= useState(isLoggedIn.displayName)
  const [address, setAddress]= useState("")
  const [number, setNumber]= useState('')

  useEffect(() => {
     if(isLoggedIn && isLoggedIn.photoURL){
        setPhotoURL(isLoggedIn.photoURL)
      }
    }, [isLoggedIn])

   const handleUpdate=()=>{
   
    upload(dp, isLoggedIn,setLoading)

    const newData = {
      displayName: newUserName,
      photoURL:photoURL
    };
    firebase.auth().currentUser.updateProfile(newData).then( res=>
      navigation('/profile')
    )
  }

   const handleCoverChange=()=>{
   
   }
   const handleDpChange=(e)=>{
   if( e.target.files[0]){
    setDp(e.target.files[0])
   }
  
  }

  return (
    <div>
        <h2 className='h-etitle'>Edit Account Details</h2>
    <div className='p-econtainer'>
      <img className='p-cover' src={coverPhoto}/>
      <img className='p-dp' src={photoURL}/>

    <label htmlFor='edit-cover'>
        <input type='file'  hidden id='edit-cover' onChange={handleCoverChange} ></input> 
        <p className='inp-cover'>🖍</p>
     </label>

     <div className='div-lbl'>
        <label htmlFor='edit-dp'>
        <input  type='file'  hidden id='edit-dp'  onChange={handleDpChange} ></input> 
        <p className='inp-dp'>🖍</p>
        </label>
     </div>


     <p className='p-title-name'>* Full name</p>
     <input type='text' className='inp-ename' name='newUserName' value={newUserName} placeholder='Enter new name' onChange={e => setNewUserName(e.target.value)}></input>

     <p className='p-title-email'>* Email Address</p>
     <input type='text' className='inp-e-email' disabled placeholder={isLoggedIn.email} ></input>

     <p className='p-title-address'>Address (Will be used for checkout)</p>
     <input type='text' className='inp-eaddress' name='address' value={address} placeholder='H.1 St.3, Lahore Cantt, Punjab, Pakistan' onChange={e => setAddress(e.target.value)}>
     </input>

     <p className='p-title-mobile'>Mobile Number (Will be used for checkout)</p>
     <input type='tel' className='inp-enum' placeholder='+92' name='number' value={number} onChange={e => setNumber(e.target.value)}></input>


     <Link to={'/profile'}>
     <button className='btn-back'>Back to Profile</button> </Link>
     <button type='submit' disabled={loading} className='btn-updt' onClick={handleUpdate}>Update Profile</button>
     </div>

    </div>
  )
  }


export default EditProfile
