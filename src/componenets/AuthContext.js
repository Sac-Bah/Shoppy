import React, { useContext, useState, useEffect } from 'react'
import {app} from './Firebase'
import { useDispatch } from 'react-redux'
import { setUser } from 'Redux/Action';




const AuthContext= React.createContext()


 export function AuthProvider({children}) {

 
  const [isLoggedIn,setIsLoggedIn]= useState(null)
  const [pending,setPending]= useState(true)

  const dispatch=useDispatch()



  useEffect(()=>{
    app.auth().onAuthStateChanged((user) => {
      if(user){
        dispatch(setUser(user))
       }else{
        dispatch(setUser(null))
       }
      console.log(user)
      setIsLoggedIn(user)
      setPending(false)
    
    })},[])
    if(pending){
      return <></>
    }

    
  return (
  
    <AuthContext.Provider value={{isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  
  )
}

export const useLogin=()=>
  useContext(AuthContext)

// export async function upload(file, isLoggedIn,setPending){

//     const fileRef= ref(storage, isLoggedIn.uid + '.jpg')
//     setPending(true)
//      const snapshot= await uploadBytes(fileRef,file)

//      const photoUrl= await getDownloadURL(fileRef)

//      updateProfile(isLoggedIn, {photoURL:photoUrl})

//      setPending(false)
//      alert('Profile updated successfully. Refresh your page to see the changes!' )
   
//  }




