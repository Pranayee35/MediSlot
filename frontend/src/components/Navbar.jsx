import React, { useState,useEffect } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../assets/medislot-logo.svg'
import profile_pic from '../assets/profile_pic.png'
import dropDown_icon from '../assets/dropdown_icon.svg'
import menu_icon from '../assets/menu_icon.svg'
import cross_icon from '../assets/cross_icon.png'
import { useLocation } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu,setShowMenu] = useState(false);
    const [token,setToken] = useState(true);
    const [open,setOpen] = useState(false);
    
const location = useLocation();

useEffect(() => {
  setOpen(false);
}, [location.pathname]);
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
          ?<div onClick={() => {
        if (window.innerWidth < 768) {
    setOpen(prev => !prev);
  }
}} className='flex items-center gap-2 cursor-pointer group relative'>
            
              <img className='rounded-full w-8' src={profile_pic}/>
              <img className='w-2' src={dropDown_icon}/>
              <div/>
            <div className={`absolute top-10 right-0 min-w-48 bg-stone-100 rounded-lg flex flex-col gap-4 p-4 z-50 ${open ? "flex" : "hidden"} md:hidden       md:group-hover:flex`}>
              
                <p onClick={()=>{
                  setOpen(false);
      navigate("/myprofile");
      
    }} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>{
      navigate("/myappointments");
      setOpen(false);
    }} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={()=>{
                  setToken(false);
                  navigate("/login")

                }} className='hover:text-black cursor-pointer'>Logout</p>
             
            </div>
          </div>
          :<button onClick={()=>navigate('/login')} className='bg-primary text-white px-6 py-3 rounded-full font-light hidden md:block'>Create account</button>
        }
        <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={menu_icon}/>
        {/* mobile menu */}
        <div className={`${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={logo}/>
            <img className='w-7' onClick={()=>setShowMenu(false)} src={cross_icon}/>
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={()=>setShowMenu(false)} to='/'><p className='px-4 py-2 rounded inline-block' >HOME</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded inline-block' >ALL DOCTORS</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded inline-block'>CONTACT</p></NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar