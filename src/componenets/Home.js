import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import {  collection,getDocs} from 'firebase/firestore'
import { db} from './Firebase'

function Home() {

  const [data,setData]= useState([])
 
  useEffect(() => {
    const getThings = async () =>{ 
      const result= await getDocs(collection(db, 'products'))
      setData(result.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    getThings()

  }, [])

  

  return (
    <div>
      <div className='div-home'>
        <h1 className='head-1'><strong>See</strong>  everything &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;  with <strong>clarity</strong></h1>
        <p className='para-1'>Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</p>
        <Link to={'/shop'}>
        <button className='btn-shop'>Shop now</button>
        </Link >
      </div>

      <div className='div2-home'>
        <img className="girl1" src='../images/girl1.jpg'></img>
      </div>

      <div className='feat-link-div'>
        <h2 className='flink-head'>Featured Products</h2>
        <a className='feat-link' href='http://localhost:3000/featured'>See All</a>
      </div>
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

export default Home
