import React from 'react'
import {assets} from "../assets/admin_assets/assets.js"

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between fixed sm:fixed bg-white border-b border-black sm:z-0 z-0 lg:z-[20] w-full'>
        <img src={assets.logo} alt="cncuiet" className='w-8 sm:w-8 lg:w-12' />
        <button className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
        onClick={()=>setToken("")}>Logout</button>
    </div>
  )
}

export default Navbar