import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
const Navbar = () => {
    const {atoken} = useContext(AdminContext)
  return (
    <div className='flex justify-between items-center border-b bg-white'>
        <div className='flex items-center text-xs gap-2'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo}/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                {
                    atoken? 'Admin'
                    :'Doctor'
                }
            </p>
        </div>
        <button className='bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar