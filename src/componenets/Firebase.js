import { initializeApp } from "firebase/app";


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


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}
import {getAuth} from 'firebase/auth'