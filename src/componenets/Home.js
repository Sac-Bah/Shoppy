import React from 'react'
import { Link } from 'react-router-dom'
function Home() {
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
    </div>
  )
}

export default Home
