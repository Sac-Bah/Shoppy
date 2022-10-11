import React, { useContext, useState, useEffect } from 'react'
import {app} from './Firebase'
import { storage } from './Firebase'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {updateProfile} from 'firebase/auth'




const AuthContext= React.createContext()


 export function AuthProvider({children}) {

 
  const [isLoggedIn,setIsLoggedIn]= useState(null)
  const [pending,setPending]= useState(true)
 

  useEffect(()=>{
    app.auth().onAuthStateChanged((user) => {
      setIsLoggedIn(user)
      setPending(false)
      console.log(user)
    })},[])
    if(pending){
      return <> </>
    }

    
  return (
  
    <AuthContext.Provider value={{isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  
  )
}

export const useLogin=()=>
  useContext(AuthContext)

export async function upload(file, isLoggedIn,setPending){

    const fileRef= ref(storage, isLoggedIn.uid + '.jpg')
    setPending(true)
     const snapshot= await uploadBytes(fileRef,file)

     const photoUrl= await getDownloadURL(fileRef)

     updateProfile(isLoggedIn, {photoURL:photoUrl})

     setPending(false)
     alert('Profile updated successfully. Refresh your page to see the changes!' )
   
 }




