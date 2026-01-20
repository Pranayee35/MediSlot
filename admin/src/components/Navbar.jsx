import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const {atoken,setAtoken} = useContext(AdminContext)

    const navigate = useNavigate()

    const logout = ()=>{

        navigate('/')
        atoken&&setAtoken('')
        atoken && localStorage.removeItem('atoken')
    }

  return (
    <div className='flex justify-between items-center border-b bg-white p-5'>
        <div className='flex items-center text-xs gap-2'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.medislot}/>
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                {
                    atoken? 'Admin'
                    :'Doctor'
                }
            </p>
        </div>
        <button onClick={logout} className='bg-[#5f6fff] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar