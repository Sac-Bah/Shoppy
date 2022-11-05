import React,{useState,useEffect} from 'react'
import {  doc, onSnapshot, updateDoc,setDoc,collection,getDoc, query,where} from 'firebase/firestore'
import {db} from '../../Firebase'
import { Link } from 'react-router-dom'


function ProductBrand() {
    const [data,setData]=useState([])

    const colRef= collection(db, 'products')
    const q = query(colRef, where('brand', '==','Salt'))
    onSnapshot(q,(snapshot)=>{
        let list=[]
        snapshot.docs.forEach((doc)=>{
            list.push({...doc.data(),id:doc.id})
        })
        setData(list)
    })

    
        
  return (
    <div>
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
      </Link>)})}
      </div>
    </div>
  )
}

export default ProductBrand
