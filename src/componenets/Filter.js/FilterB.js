import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {  collection,getDocs} from 'firebase/firestore'
import { db} from '../Firebase'

function FilterB() {
    const [data,setData]= useState([])
 
    useEffect(() => {
      const getThings = async () =>{ 
        const result= await getDocs(collection(db, 'products'))
        setData(result.docs.map(doc => ({...doc.data(), id: doc.id})))
      }
      getThings()
  
    }, [])

    const filterData=(val)=>{
        const result = data.filter((itm)=>{
            return data.brand===val;
        })
        setData(result)
        console.log(result)
    }
  return (
    <div>
         <div className='dropdown' id='b-dd'>
        <a className="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
          <span>Choose Brand</span> 
        </a>

        <ul className="dropdown-menu">
          <li> <a className="dropdown-item" ><button style={{border: 'none'}} onClick={()=>filterData('Salt')}>Salt</button></a></li> 
          <li><a className="dropdown-item" href='#'><button style={{border: 'none'}} onClick={()=>filterData('Kibal Black')}>Kibal Black</button></a></li> 
          <li><a className="dropdown-item" href='#'><button style={{border: 'none'}} onClick={()=>filterData('Salt Malaat')}>Salt Malaat</button></a></li> 
          <li><a className="dropdown-item" href='#'><button style={{border: 'none'}} onClick={()=>filterData('Betsin Malaat')}>Betsin Malaat</button></a></li> 
         </ul>
         </div>
    </div>
  )
}

export default FilterB
