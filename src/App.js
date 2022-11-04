import './App.css';
import Navbar from './componenets/Navbar';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Home from './componenets/Home';
import Shop from './componenets/Shop';
import Featured from './componenets/Featured';
import Recommended from './componenets/Recommended';
import SignUp from './componenets/Login/SignUp';
import SignIn from './componenets/Login/SignIn';
import GuestNav from './componenets/Login/GuestNav';
import { AuthProvider } from './componenets/AuthContext';
import {useLogin} from './componenets/AuthContext'
import Profile from './componenets/Profile/Profile';
import EditProfile from './componenets/Profile/EditProfile';
import ProductForm from './componenets/Login/Product/ProductForm';
import ProductDisplay from './componenets/Login/Product/ProductDisplay';

function App() {
//  const loggedIn= props.isLoggedIn 

  return (
    <AuthProvider>
    <Router>
   
    <Navbar/>
   
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/shop' element={<Shop/>}></Route>
      <Route path='/featured' element={<Featured/>}></Route>
      <Route path='/recommended' element={<Recommended/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      <Route path='/create-product' element={<ProductForm/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/profile/edit' element={<EditProfile/>}></Route>
      <Route path='/product/:id' element={<ProductDisplay/>}></Route>
      </Routes>
      

    </Router>
    </AuthProvider>
  

  );
}

export default App;
