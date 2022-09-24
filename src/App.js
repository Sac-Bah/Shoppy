import './App.css';
import Navbar from './componenets/Navbar';
import {Route, Routes, BrowserRouter as Router} from 'react-router-dom'
import Home from './componenets/Home';
import Shop from './componenets/Shop';
import Featured from './componenets/Featured';
import Recommended from './componenets/Recommended';
import SignUp from './componenets/Login/SignUp';
import SignIn from './componenets/Login/SignIn';

function App() {
  return (

    <Router>
    <div >
    <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/shop' element={<Shop/>}></Route>
      <Route path='/featured' element={<Featured/>}></Route>
      <Route path='/recommended' element={<Recommended/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/signin' element={<SignIn/>}></Route>
      </Routes>
    </div>
    </Router>

  );
}

export default App;
