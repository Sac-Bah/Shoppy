import React, { useContext, useState, useEffect } from 'react'
import {app} from './Firebase'





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




