// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { assets } from '../assets/admin_assets/assets'

// const Sidebar = () => {
//   return (
//     <div className='w-[18%] min-h-screen border-r-2'>
//         <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
//             <NavLink to="/add" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.add_icon} alt="" />
//                 <p className='hidden md:block '>Add Bank</p>
//             </NavLink>

//             <NavLink to="/listbanks" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.order_icon} alt="" />
//                 <p className='hidden md:block '>All Banks</p>
//             </NavLink>

//             {/* <NavLink to="/orders" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.order_icon} alt="" />
//                 <p className='hidden md:block '>Manage Openings</p>
//             </NavLink> */}

//             <NavLink to="/loan-applications" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.order_icon} alt="" />
//                 <p className='hidden md:block '>Loan Applications</p>
//             </NavLink>

//             <NavLink to="/partners" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.order_icon} alt="" />
//                 <p className='hidden md:block '>Manage Partners</p>
//             </NavLink>

//             <NavLink to="/feedbacks" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.order_icon} alt="" />
//                 <p className='hidden md:block '>Manage Feedbacks</p>
//             </NavLink>

//             {/* <NavLink to="/addEvent" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.order_icon} alt="" />
//                 <p className='hidden md:block '>Add Event</p>
//             </NavLink>

//             <NavLink to="/listEvent" className="flex items-center gap-3 border px-2 border-gray-300 border-r-0 py-2 rounded-l" >
//                 <img className="w-5 h-5" src={assets.order_icon} alt="" />
//                 <p className='hidden md:block '>All Events</p>
//             </NavLink> */}
//         </div>
//     </div>
//   )
// }

// export default Sidebar



import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/admin_assets/assets';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { path: "/add", icon: assets.add_icon, label: "Add Bank" },
    { path: "/listbanks", icon: assets.order_icon, label: "All Banks" },
    { path: "/loan-applications", icon: assets.order_icon, label: "Loan Applications" },
    { path: "/partners", icon: assets.order_icon, label: "Manage Partners" },
    { path: "/feedbacks", icon: assets.order_icon, label: "Manage Feedbacks" },
    { path: "/admin-phone", icon: assets.order_icon, label: "Manage Admin Phone" }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-2 left-20 z-40 p-2 "
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10 "
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar/Menu Container */}
      <div className={`
        md:w-[18%] md:min-h-screen md:border-r-2 
        fixed md:static top-0 left-0 z-10 sm:z-10 lg:z-[0] lg:pt-24
        bg-white 
        ${isMenuOpen ? 'w-64' : 'w-0'} md:w-[18%]
        h-full md:h-auto
        transition-all duration-300 ease-in-out
        overflow-hidden lg:fixed lg:inset-0
      `}>
        {/* Menu Items Container */}
        <div className={`
          flex md:flex-col gap-2 md:gap-4 
          md:pt-6 md:pl-[20%]
          p-4 pt-16 
          text-[15px]
          ${isMenuOpen ? 'flex-col' : 'flex-row'}
        `}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 
                border px-2 border-gray-300 
                ${isActive ? 'bg-blue-50 border-blue-300' : ''}
                md:border-r-0 
                py-2 
                md:rounded-l
                rounded
                hover:bg-gray-50
                transition-colors
                w-full
              `}
              onClick={() => setIsMenuOpen(false)}
            >
              <img className="w-5 h-5" src={item.icon} alt="" />
              <p className="whitespace-nowrap">{item.label}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;