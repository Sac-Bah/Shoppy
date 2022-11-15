import * as type from './ActionType'
import { auth, db} from '../componenets/Firebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from'firebase/auth'
import {signInWithPopup, GoogleAuthProvider, updateProfile} from 'firebase/auth'
import firebase from 'firebase/compat/app'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import {signOut} from 'firebase/auth'

                                    //ACTIONS
//SIGNUP Action
const signupStart = () =>{
    return{
        type: type.SIGNUP_START
    }
}
const signupSuccess = (user) =>{
    return{
        type: type.SIGNUP_SUCCESS,
        payload: user
    }
}
const signupError = (error) =>{
    return{
        type: type.SIGNUP_ERROR,
        payload: error
    }
}


//LOGIN Action
const loginStart = () =>{
    return{
        type: type.LOGIN_START,
    }
}
const loginSuccess = (user) =>{
    return{
        type: type.LOGIN_SUCCESS,
        payload: user
    }
}
const loginError = (error) =>{
    return{
        type: type.LOGIN_ERROR,
        payload: error
    }
}


//LOGOUT Action
const logoutStart = () =>{
    return{
        type: type.LOGOUT_START,
    }
}
const logoutSuccess = () =>{
    return{
        type: type.LOGOUT_SUCCESS,
    }
}
const logoutError = (error) =>{
    return{
        type: type.LOGOUT_ERROR,
        payload: error
    }
}


//USER action
export const setUser = (user) =>{
    return{
        type: type.SET_USER,
        payload: user
    }
}


//GOOGLE action
const gsiStart = () =>{
    return{
        type: type.GOOGLE_SIGNIN_START,
    }
}
const gsiSuccess = () =>{
    return{
        type: type.GOOGLE_SIGNIN_SUCCESS,
    }
}
const gsiError = (error) =>{
    return{
        type: type.GOOGLE_SIGNIN_ERROR,
        payload: error
    }
}

                                            //FUNCTIONS
// SIGNUP Function
export const signupInitiate = (email,password,username)=>{
    return function(dispatch){
        dispatch(signupStart())
        createUserWithEmailAndPassword(auth,email,password).then(async(user)=>{
            await updateProfile(auth.currentUser,{
                displayName: username
            })
            await setDoc(doc(db,'users', user.user.uid), {username, email, timeStamp: serverTimestamp(), address:"", phoneNumber:"", coverPhoto:'', profilePhoto:user.user.photoURL})    
            dispatch(signupSuccess(user))
        }).catch((err)=>{
            alert(err.message)
            dispatch(signupError(err.message))
        })
    }
}


// LOGIN Function
export const loginInitiate = (email,password)=>{
    return function(dispatch){
        dispatch(loginStart())
        signInWithEmailAndPassword(auth,email,password).then(async(user)=>{
            dispatch(loginSuccess(user))
        }).catch((err)=>{
            alert(err.message)
            dispatch(loginError(err.message))
        })
    }
}

// LOGOUT Function
export const logoutInitiate = ()=>{
    return function(dispatch){
        dispatch(logoutStart())
        signOut(auth)
        .then((user)=>{
            dispatch(logoutSuccess(user))
        }).catch((err)=>{
            alert(err.message)
            dispatch(logoutError(err.message))
        })
    }
}

//GOOGLE function

export const gsiInitiate = ()=>{
    return function(dispatch){
        dispatch(gsiStart())
        const provider = new GoogleAuthProvider() 
        signInWithPopup(auth,provider).then(async(user)=>{
            await setDoc(doc(db,'users', user.user.uid), {username:user.user.displayName, email: user.user.email, timeStamp: serverTimestamp(), address:"", phoneNumber:"", coverPhoto:'', profilePhoto:user.user.photoURL})
            dispatch(gsiSuccess(user))
        }).catch((err)=>{
            alert(err.message)
            dispatch(gsiError(err.message))
        })
    }
}