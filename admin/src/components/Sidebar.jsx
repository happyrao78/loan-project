import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink to="/add" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
                <img className="w-5 h-5" src={assets.add_icon} alt="" />
                <p className='hidden md:block '>Add Bank</p>
            </NavLink>

            <NavLink to="/list" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
                <img className="w-5 h-5" src={assets.order_icon} alt="" />
                <p className='hidden md:block '>All Banks</p>
            </NavLink>

            {/* <NavLink to="/orders" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
                <img className="w-5 h-5" src={assets.order_icon} alt="" />
                <p className='hidden md:block '>Manage Openings</p>
            </NavLink> */}

            <NavLink to="/applications" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
                <img className="w-5 h-5" src={assets.order_icon} alt="" />
                <p className='hidden md:block '>Loan Applications</p>
            </NavLink>

            {/* <NavLink to="/addEvent" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
                <img className="w-5 h-5" src={assets.order_icon} alt="" />
                <p className='hidden md:block '>Add Event</p>
            </NavLink>

            <NavLink to="/listEvent" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
                <img className="w-5 h-5" src={assets.order_icon} alt="" />
                <p className='hidden md:block '>All Events</p>
            </NavLink> */}
        </div>
    </div>
  )
}

export default Sidebar