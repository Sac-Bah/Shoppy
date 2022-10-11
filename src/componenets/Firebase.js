import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from 'firebase/auth'
import { useState , useEffect } from "react";
import {getStorage} from 'firebase/storage'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const {REACT_APP_APIKEY,REACT_APP_AUTHDOM,REACT_APP_PRJCTID,
    REACT_APP_STRBUCKT,REACT_APP_MSGSID,REACT_APP_APPID} = process.env


const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOM,
  projectId: REACT_APP_PRJCTID,
  storageBucket: REACT_APP_STRBUCKT,
  messagingSenderId: REACT_APP_MSGSID,
  appId: REACT_APP_APPID
};


const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage= getStorage()
export {auth}
export {app}
export {storage}

// export function useAuth(){
//   const[currentUser, setCurrentUser]= useState()
//   useEffect(()=>{
//     const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
//     return unsub
//   },[])
//   return currentUser
// }

