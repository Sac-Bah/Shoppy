import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../AuthContext'
import {  doc, onSnapshot, updateDoc,setDoc} from 'firebase/firestore'
import {ref, uploadBytes, getDownloadURL, totalBytes,bytesTranferred,uploadString} from 'firebase/storage'
import { db, storage } from '../Firebase'
import 'firebase/compat/firestore'
import { async } from '@firebase/util'

function EditProfile() {
  const navigation = useNavigate()
  const navigate = useNavigate()
  const{isLoggedIn}= useLogin()
  const [photoURL, setPhotoURL]= useState(isLoggedIn?.photoURL)
  const [coverPhoto, setCoverPhoto]= useState('https://cdn.images.express.co.uk/img/dynamic/143/590x/No-Man-s-Sky-gets-alternative-covers-689362.jpg')
  const[uploading,setUploading]=useState(false)
  const[url,setUrl]=useState('')
  const[userData,setUserData]=useState(null)
  const [loading,setLoading]=useState(true)
  
  // const [cover,setCover]=useState(null)
  // const [dp,setDp]=useState(null) 

 
  const userCollection= doc(db,'users',isLoggedIn.uid)
  
  // const getUser = async()=>{
  //    const currentUser=await db.collection('users').doc(isLoggedIn.uid).get()
  //   .then((documentSnapshot)=>{
  //     if(documentSnapshot.exists){
  //       console.log('userdata', documentSnapshot.data())
  //       setUserData(documentSnapshot.data())
  //     }
  //   })
  // }

  const getUser=async()=>{
    
    await onSnapshot(userCollection,(doc)=>{
      console.log('user data =>',doc.data())
      setLoading(false)
      setUserData(doc.data())
      console.log(userData)
    })
    }
    useEffect(()=>{
    getUser()
    },[])
  


 

  useEffect(()=>{
    if(isLoggedIn && isLoggedIn.photoURL){
    setPhotoURL(isLoggedIn.photoURL)
    }else{
      setPhotoURL("https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=")
    }
  }, [isLoggedIn])
  if(loading){
    return <></>
  }
  
 
      // const uploadCover = async () => {
      //   const coverRef = ref(
      //     storage,
      //     `cover/${new Date().getTime()} - ${url.name}`
      //   )
      //   try {      
      //     const snap = await uploadBytes(coverRef, url);
      //     const coverUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      //     await updateDoc(doc(db, "users", isLoggedIn.uid), {
      //       coverPhoto: coverUrl,
      //       // avatarPath: snap.ref.fullPath,
      //     });
      //     setUrl("");
      //   } catch (err) {
      //     console.log(err.message);
      //   }
      // };
    //       const coverUrl=url
    //       const coverRef = ref(storage,'cover');
    //       setUploading(true)
    //       uploadBytes(coverRef,url).then(()=>{
    //        const urlC=   getDownloadURL(coverRef).then((cu)=>{
    //         if(coverUrl===null && userData.coverPhoto){
    //           coverUrl=userData.coverPhoto;
    //         }
    //          updateDoc(doc(db, "users", isLoggedIn.uid), {
    //           coverPhoto: coverUrl,
    //           // avatarPath: snap.ref.fullPath,
    //         });
    //        }).catch((e)=>{console.log(e.message)
    //       }); setUploading(false)
    //       setUrl('');
    //       }) .catch ((e) =>{
    //        console.log(e.message);
    //        }
    //       )}
    //  ;
    

    
  // const uploadCover=async()=>{
  //   if(cover===null){
  //     return null;
  //   }
  //   const uploadUri=cover
  //   setUploading(true)
  //   const coverRef = ref(storage, `cover/${cover.name + Date.now()}`)
  //   const task= coverRef.putFile(uploadUri)
  //  try{
  //   await task;
  //   const snapshot= await uploadBytes(coverRef,cover)
  //     const coverUrl= await getDownloadURL(coverRef)
  //       setUploading(false)
  //       setCover(null)
  //       return coverUrl;
  //   }

  //  catch(e){
  //     console.log(e)
  
  //   }
  // }
  


 
  
    
    //   const coverUrl = await getDownloadURL(coverRef);

    //   setUploading(false);
    //   setCover(null);

      
    //   return coverUrl;

    // } 
 
  // const uploadDp=async()=>{
  //   const fileRef= ref(storage, isLoggedIn.uid + '.jpg')
  //   setUploading(true)
  //   try{
  //     const snapshot= await uploadBytes(fileRef)
  //    const dpUrl= await getDownloadURL(fileRef)
  //    setUploading(false)
    
  //    return dpUrl
  //   }catch(e){
  //     alert(e)
  //     return null
  //   }
  // }
   
 
  



  // const uploadDp=async()=>{
  //   if(dp==null){
  //     return null
  //   }
  //   const uploadDpUrl = dp
  //   let dpFileName=uploadDpUrl.substring(uploadDpUrl.lastIndexOf('/')+1)
  //   const fileName=dpFileName+Date.now()
  
  //   setUploading(true)
    
  //  const storageDpRef= ref(`${storage} image/${fileName}`)
  //   try{
  //     const snapshot= await uploadBytes(storageDpRef)
  //     const dpUrl= await getDownloadURL(storageDpRef)
  //     setUploading(false)
  //     setDp(null)
  //     return dpUrl
  //   }catch(e){
  //     alert(e)
  //     return null
  //   }
  // }

  
const imageHandlerD=(e)=>{
  const reader = new FileReader()
  reader.onload=()=>{
    if(reader.readyState===2){
      setPhotoURL(reader.result)
    }
  }
  reader.readAsDataURL(e.target.files[0])
  // if( e.target.files[0]){
  //     setPhotoURL(e.target.files[0])
  //    }
}


const imageHandlerC=(e)=>{
  // if( e.target.files[0]){
  //   setUrl(e.target.files[0])
  //  }
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
  
  // const uploadCover =  () => {
  //   if(cover===null){
  //     return null;
  //   }
  //   const coverUrl=cover
  //   const coverRef = ref(storage,'cover');
  //   uploadBytes(coverRef,cover).then(()=>{
  //    const url=   getDownloadURL(coverRef).then((url)=>{
  //      setUrl(url)
  //    }).catch((e)=>{console.log(e.message)
  //   }); setCover(null);
  //   }) .catch ((e) =>{
  //    console.log(e.message);
  //    }
  //  )
  // }

;


  const handleUpdate=async(e)=>{
    e.preventDefault()
  //   let coverUrl=await uploadCover();
  // if(coverUrl===null && userData.coverPhoto){
  //     coverUrl=userData.coverPhoto;
  //   }
   updateDoc(doc(db,'users',isLoggedIn.uid),{
            username:userData.username,
            address:userData.address,
            phoneNumber:userData.phoneNumber
          }).then(()=>{
            console.log('Updated Successfully')
            navigate('/profile')})
         .catch( (err) => {
          console.log(err.message);
        })
      };
      
    
    
     
   
  

  return (
    <div>
        <h2 className='h-etitle'>Edit Account Details</h2>
    <div className='p-econtainer'>
      <img className='p-cover' src='../images/cover.jpg'/>
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
     <input type='text' className='inp-ename' name='newUserName' value={userData ? userData.username:''} onChange={(e)=>setUserData({...userData,username:e.target.value})}  ></input>

     <p className='p-title-email'>* Email Address</p>
     <input type='text' className='inp-e-email' disabled placeholder={isLoggedIn.email} ></input>

     <label htmlFor='address-inp' className='p-title-address'>Address (Will be used for checkout)</label>
     <input id='address-inp' type='text' className='inp-eaddress' value={userData ? userData.address:''} onChange={(e)=>setUserData({...userData,address:e.target.value})} name='address' placeholder='H.1 St.3, Lahore Cantt, Punjab, Pakistan' >
     </input>

     <label  htmlFor='phone-inp' className='p-title-mobile'>Mobile Number (Will be used for checkout)</label>
     <input  id='phone-inp' type='tel' className='inp-enum' placeholder='+92' name='number' value={userData ? userData.phoneNumber:''} onChange={(e)=>setUserData({...userData,phoneNumber:e.target.value})} ></input>


     <Link to={'/profile'}>
     <button className='btn-back'>Back to Profile</button> </Link>
     <button type='submit' className='btn-updt' onClick={handleUpdate}>Update Profile</button>
     </form>
     </div>
 
    </div>
  )
  }


export default EditProfile
