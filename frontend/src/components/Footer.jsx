import React from 'react'
import medislot from '../assets/medislot-logo.svg'
const Footer = () => {
  return (
    <div className='md:mx-10'>
       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* left side */}
        <div>
          <img className='mb-5 w-40' src={medislot}/>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, provident voluptas consequuntur reprehenderit alias doloribus. Eius autem id quas! Aspernatur hic aut voluptatibus voluptate autem!</p>
        </div>
        {/* center */}
        
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Privacy policy</li>
        </ul>
        </div>
        {/* right side */}
        <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-2 text-gray-600'>
          <li>+1-212-456-7890</li>
          <li>medislot@gmail.com</li>
        </ul>
        </div>
       </div>
       {/*copyright  */}
       <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copyright 2024@ MediSlot. All Rights Reserved.</p>
       </div>
    </div>
  )
}

export default Footer