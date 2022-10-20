import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../AuthContext'
import { upload } from '../AuthContext'
import firebase from 'firebase/compat/app'


function EditProfile() {
  const navigation = useNavigate()

  const{isLoggedIn}= useLogin()
  const [photoURL, setPhotoURL]= useState("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=")
  const [coverPhoto, setCoverPhoto]= useState('https://cdn.images.express.co.uk/img/dynamic/143/590x/No-Man-s-Sky-gets-alternative-covers-689362.jpg')
  // const [dp, setDp]=useState(isLoggedIn.photoURL)
  // const [loading, setLoading]=useState(false)
  
  
  // const [newUserName, setNewUserName]= useState(isLoggedIn.displayName)
  // const [address, setAddress]= useState("")
  // const [number, setNumber]= useState('')

  // useEffect(() => {
  //    if(isLoggedIn && isLoggedIn.photoURL){
  //       setPhotoURL(isLoggedIn.photoURL)
  //     }
  //   }, [isLoggedIn])


const imageHandlerD=(e)=>{
  const reader = new FileReader()
  reader.onload=()=>{
    if(reader.readyState===2){
      setPhotoURL(reader.result)
     
    }
 
  }
  reader.readAsDataURL(e.target.files[0])
}
const imageHandlerC=(e)=>{
  const reader = new FileReader()
  reader.onload=()=>{
    if(reader.readyState===2){
      setCoverPhoto(reader.result)
     
    }
 
  }
  reader.readAsDataURL(e.target.files[0])
}


  //  const handleUpdate=()=>{
  //   handleDpChange()
  //   upload(dp, isLoggedIn,setLoading)

  //   const newData = {
  //     displayName: newUserName,
  //     photoURL:photoURL
  //   };
  //   firebase.auth().currentUser.updateProfile(newData).then( res=>
  //     navigation('/profile')
  //   )
  // }

  //  const handleCoverChange=()=>{
   
  //  }

  //  const handleDpChange=(e)=>{
  //  if( e.target.files[0]){
  //   setDp(e.target.files[0])
  //  }

  // }

  return (
    <div>
        <h2 className='h-etitle'>Edit Account Details</h2>
    <div className='p-econtainer'>
      <img className='p-cover' src={coverPhoto}/>
      <img className='p-dp' src={photoURL}/>

      <input type='file'   id='edit-cover' onChange={imageHandlerC} accept='image/*'></input> 
      <div className='div-lbl2'>
    <label htmlFor='edit-cover' className='inp-cover'>
        🖍
     </label>
     </div>
   
     <input  type='file'   id='edit-dp'  onChange={imageHandlerD} accept='image/*'></input> 
     <div className='div-lbl'>
        <label htmlFor='edit-dp' className='inp-dp'>
       🖍
        </label>
        </div>

<form id='edit-form'>
     <p className='p-title-name'>* Full name</p>
     <input type='text' className='inp-ename' name='newUserName'  ></input>

     <p className='p-title-email'>* Email Address</p>
     <input type='text' className='inp-e-email' disabled placeholder={isLoggedIn.email} ></input>

     <label htmlFor='address-inp' className='p-title-address'>Address (Will be used for checkout)</label>
     <input id='address-inp' type='text' className='inp-eaddress' name='address' placeholder='H.1 St.3, Lahore Cantt, Punjab, Pakistan' >
     </input>

     <label  htmlFor='phone-inp' className='p-title-mobile'>Mobile Number (Will be used for checkout)</label>
     <input  id='phone-inp' type='tel' className='inp-enum' placeholder='+92' name='number' ></input>


     <Link to={'/profile'}>
     <button className='btn-back'>Back to Profile</button> </Link>
     <button type='submit' className='btn-updt' >Update Profile</button>
     </form>
     </div>
 
    </div>
  )
  }


export default EditProfile
