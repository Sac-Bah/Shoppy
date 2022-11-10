import React, { useState, useEffect } from 'react'

function Pagination({pages, setCurrentPage}) {

  const[currentBtn,setCurrentBtn]=useState(1)
  
  useEffect(()=>{
      setCurrentPage(currentBtn)
  },[currentBtn,setCurrentPage])


  const numOfPages=[]

  for(let i=1; i<= pages; i++){
    numOfPages.push(i)
  }

  return (
    <div className="clearfix" style={{marginTop:'50px', float:'right', marginRight:'90px'}}>
   
    <ul className="pagination">

      <li className={`${currentBtn===1 ? 'page-item disabled' : 'page-item'}`}> 
        <a href="#" className="page-link"  onClick={() => setCurrentBtn((prev) => prev===1 ? prev : prev-1)}>
          Prev
         </a>
      </li>

    {numOfPages.map((page,index) => {
      return <li key={index} className={`${currentBtn=== page ? 'page-item active' : 'page-item'}`}>
        <a href="#" className="page-link" onClick={() => setCurrentBtn(page)}>{page}</a>
      </li>
    })}


      <li className={`${currentBtn=== numOfPages.length ? 'page-item disabled' : 'page-item'}`}> 
        <a href="#" className="page-link"  onClick={() => setCurrentBtn((next) => next===numOfPages.length ? next : next + 1)}>
          Next
         </a>
      </li>
        
       
    </ul>
</div>

  )
}

export default Pagination