import React, { useState,useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {  doc, onSnapshot, updateDoc,setDoc,collection,getDoc} from 'firebase/firestore'
import {db} from '../../Firebase'

function ProductDisplay() {
    const {id}=useParams()
    const [data,setData]=useState([])
 
          const result= doc(db, 'products',id)
      // getDoc(result).then((doc)=>{console.log(doc.data(),doc.id)})
       onSnapshot(result,(doc)=>{setData(doc.data())})


  return (
    <div>
        <Link to={'/shop'}><button className='back-btn'>⬅ Back to shop</button></Link>

   <div className='product'>
   <div className='img-display'>
     <img className='prdct-img-dis' src={data.img}></img>
   </div>

   <div className='details'>
     <p className='bpp'>{data.brand}</p>

     <h2 className='name-dis'>{data.name}</h2>

     <p className='des-dis'>{data.description}</p>

     <p className='bpps'>Lens Width and Frame Size</p>
     <select id='size'>
         <option value='' disabled selected hidden>~Select Size ~ </option>
         <option value='28 mm'>28 mm</option>
         <option value='36 mm'>36 mm</option>
         <option value='42 mm'>42 mm</option>
     </select>

     <p className='bppc'>Choose Color</p>
     <div className='colors'>
         <div className='black'> </div>
         <div className='pink'> </div>
         <div className='blue'> </div>
         <div className='brown'> </div>
         <div className='red'> </div>
         <div className='green'> </div>
         <div className='orange'> </div>
     </div>

     <h2 className='price'>{data.price}/-</h2>
     <button className='bskt-btn'>Add To Basket</button>
 </div>
 </div>

    
    </div>
  )
}

export default ProductDisplay
