import { useLogin } from './AuthContext'
import React, { useEffect, useState } from 'react'
import { auth } from './Firebase'
import {signOut} from 'firebase/auth'
import { Link,useNavigate } from 'react-router-dom'
import {  doc, onSnapshot, collection,getDocs } from 'firebase/firestore'
import { db} from './Firebase'


 


 
function Navbar() {
  const {isLoggedIn}= useLogin()
  const navigation= useNavigate()

  const [photoURL, setPhotoURL]= useState('')
  const[userData,setUserData]=useState(null)
  const [loading,setLoading]=useState(true)
  const [search,setSearch]=useState('')
  // const [data,setData]= useState([])
  // const [filtered,setFiltered]=useState(data)

 
//   useEffect(() => {
//     const getThings = async () =>{ 
//       const result= await getDocs(collection(db, 'products'))
//       setData(result.docs.map(doc => ({...doc.data(), id: doc.id})))
//     }

//     getThings()
//   }, [])

// useEffect(()=>{
//   const res=data.filter((item)=>{
//     item.name.toLowerCase().includes(value)
//   })
//   setFiltered(res)
// },[value])

  useEffect(()=>{
    if(isLoggedIn && isLoggedIn.photoURL){
    setPhotoURL(isLoggedIn.photoURL)
    }else(
      setPhotoURL('https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=')
    )
  }, [isLoggedIn])  

  const getUser=async()=>{ 
    const userCollection= doc(db,'users',isLoggedIn.uid)
     await onSnapshot(userCollection,(doc)=>{
      setLoading(false)
      setUserData(doc.data())
    })
    }
   
    useEffect(()=>{
      getUser()
      },[]);
      if(loading){
        return <></>
      }
  

  function logout(){
    signOut(auth)
    .then(res => {navigation('/signup')})
    .catch(err=> alert(err.message))
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    navigation(`/search?name=${search}`)
    setSearch('')
  }

  return (
    <div className='nav-div'>
        <nav className='nav-m'>
        <Link to={'/'}>
            <img className='logo' src="../images/logo.png"/>
           </Link>
            <ul className='nav-ul'>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/'>Home</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/shop'>Shop</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/featured'>Featured</a></li>
              <li className='nav-link'><a className='links-a' href='http://localhost:3000/recommended'>Recommended</a></li>
            </ul>
          
            <form onSubmit={handleSubmit}>
            <input className='search-bar' type='text' placeholder='Search Product...' onChange={(e)=>setSearch(e.target.value)} value={search}></input>
            </form>
{/* {filtered.map((pd)=>{
  return(<h1>{pd.name}</h1>)
})} */}



{isLoggedIn ?  <><div className='dropdown'>
        <a className="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
          {isLoggedIn && <><span>{userData? userData.username:''}</span> &nbsp; <img className='profile' src={photoURL}></img></>}
        </a>

        <ul className="dropdown-menu">
            <li><a className="dropdown-item" href='http://localhost:3000/profile'>View Profile</a></li>
            <li><a className="dropdown-item" href='http://localhost:3000/create-product'>Create Product</a></li>
             <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
         </ul>
         </div>
         </>
            : 
            <><Link to={'/signup'}>
           <button  className='btn-up'>Sign Up</button>
          </Link>
          
          <Link to={'/signin'}>
            <button  className='btn-in'>Sign In</button>
            </Link> 
            </>
           }
           </nav>
         
    </div>
  )
}

// const NavRoute=()=> {
  
//   const {isLoggedIn}= useLogin()
 
//   return    isLoggedIn ? <GuestNav/>: <Navbar/> 
      

  
// }

export default Navbar
