import React, { useContext, useState } from 'react'






const AuthContext= React.createContext()

// export function useAuth(){
//     return useContext(AuthContext)
//   }


 export function AuthProvider({children}) {
  const [isLoggedIn,setIsLoggedIn]= useState()

    
  // useEffect(()=>{
  //   const unsub = onAuthStateChanged(auth,user => {
  //     setCurrentUser(user)
  //     return unsub
  //   })
  // },[])
 
  // const value={
  //   currentUser
  // }
  return (
  
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  
  )
}

export const useLogin=()=>
  useContext(AuthContext)




