import React,{useState,useEffect} from 'react'
import {useLocation, Link} from 'react-router-dom'
import {  doc, onSnapshot, collection,getDocs, orderBy,  } from 'firebase/firestore'
import { db} from '../Firebase'
import { async } from '@firebase/util'


function Search() {
    const [productData,setProductData]= useState([])
    const [filtered,setFiltered]=useState([])


    const useQuery=()=>{
        return new URLSearchParams(useLocation().search)
    }

    let query = useQuery()
    let search= query.get('name')


useEffect(()=>{
const fetchData=async()=>{
    const data=await getDocs(collection(db, 'products'))
    setProductData(data.docs.map(doc => ({...doc.data(), id: doc.id})))
}
fetchData()
},[])


useEffect(()=>{
 const res=productData.filter((user)=>
    user.name.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(res)

},[search,productData])

    
  return (
    <div>
      <h2 className='search-h'>Search results for '{search}'</h2>

      <div className='grid-div'>
{filtered.map((pdata)=>{return(<Link  style={{ textDecoration: 'none' }} to={`/product/${pdata.id}`}><div className='feat-prdct-div'>
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
    </div>
  )
}

export default Search
