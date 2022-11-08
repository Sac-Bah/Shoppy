import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {  collection,getDocs} from 'firebase/firestore'
import { db} from './Firebase'
import FilterB from './Filter.js/FilterB'
import { async } from '@firebase/util'
import { Dropdown } from 'react-bootstrap'




function Shop() {
  const [data,setData]= useState([])
 const [filtered,setFiltered]=useState([])


 useEffect(() => {
  const getThings = async () =>{ 
    const result= await getDocs(collection(db, 'products'))
    setData(result.docs.map(doc => ({...doc.data(), id: doc.id})))
  }
  getThings()

}, [])


  const filterData=  (filVal)=>{
    setFiltered(data.filter((itm)=>{
        return itm.brand===filVal;
    }))
    
    console.log(data)
}

  
const returntoAll=()=>{
setFiltered([]);
}

 

  return (
   
    <div>
       <div className='dropdown' id='b-dd'>
        <a className="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
          <span>Choose Brand</span> 
        </a>

        <ul className="dropdown-menu">
          <li> <a className="dropdown-item" ><button style={{border: 'none', padding:'10px', width:'100%', backgroundColor:'white'}} onClick={()=>filterData('Salt')}>Salt</button></a></li> 
          <li><a className="dropdown-item" ><button style={{border: 'none', padding:'10px', width:'100%', backgroundColor:'white'}} onClick={()=>filterData('Kibal Black')}>Kibal Black</button></a></li> 
          <li><a className="dropdown-item" ><button style={{border: 'none', padding:'10px', width:'100%', backgroundColor:'white'}} onClick={()=>filterData('Salt Malaat')}>Salt Malaat</button></a></li> 
          <li><a className="dropdown-item"><button style={{border: 'none', padding:'10px', width:'100%', backgroundColor:'white'}} onClick={()=>filterData('Betsin Malaat')}>Betsin Malaat</button></a></li> 
          <li><a className="dropdown-item"><button style={{border: 'none', padding:'10px', width:'100%', backgroundColor:'white'}} onClick={returntoAll}>All</button></a></li> 
         </ul>
         </div>

      {/* <h2 style={{marginTop:'40px', textAlign:'center'}}>All Products</h2> */}
     

      {filtered.length > 0 &&(
        <>
       {/* <h2 style={{marginTop:'40px', textAlign:'center'}}>Filter: <i>{filVal}</i></h2> */}
         <div className='grid-div'>
         {filtered.map(fi=>{
          return(<Link  style={{ textDecoration: 'none' }} to={`/product/${fi.id}`}><div className='feat-prdct-div'>
                  <div className='prdct-img-div'>
                    <img className='prdct-img' src={fi.img}></img>
                  </div>
                  <div className='n-b-div'>
                    <h3 className='p-name'>{fi.name}</h3>
                    <p className='p-brand'>{fi.brand}</p>
                  </div>
                </div>
                </Link>
                )})}
                </div>
                </>
      )}


{filtered.length < 1 &&(
  <>
   <h2 style={{marginTop:'40px', textAlign:'center'}}>All Products</h2>
      <div className='grid-div'>
  {data.map(pdata=>{
return(<Link  style={{ textDecoration: 'none' }} to={`/product/${pdata.id}`}><div className='feat-prdct-div'>
        <div className='prdct-img-div'>
          <img className='prdct-img' src={pdata.img}></img>
        </div>
        <div className='n-b-div'>
          <h3 className='p-name'>{pdata.name}</h3>
          <p className='p-brand'>{pdata.brand}</p>
        </div>
      </div>
      </Link>
    
      )})}
        </div>
        </>)}

      
    </div>
  )
}

export default Shop
