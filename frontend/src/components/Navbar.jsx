import React, { useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../assets/medislot-logo.svg'
import profile_pic from '../assets/profile_pic.png'
import dropDown_icon from '../assets/dropdown_icon.svg'
const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false);
    const [token,setToken] = useState(true);
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={logo} alt='image'/>
         <ul className='hidden md:flex items-start gap-5 font-medium'>
        <li>
          <NavLink to="/">HOME</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </li>
        <li >
          <NavLink to="/about">ABOUT</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </li>
        <li >
          <NavLink to="/contact">CONTACT</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </li>
        <li>
          <NavLink to="/doctors">ALL DOCTORS</NavLink>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto'/>
        </li>
      </ul>
      <div className='flex items-center gap-4'>
        {
          token
          ?<div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='rounded-full w-8' src={profile_pic}/>
            <img className='w-2' src={dropDown_icon}/>
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>navigate('/myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('/myappointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
          :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-6 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }
        
      </div>
    </div>
  )
}

export default Navbar