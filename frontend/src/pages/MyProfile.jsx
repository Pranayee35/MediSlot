import React, { useState } from 'react'
import profile_pic from '../assets/profile_pic.png'
const MyProfile = () => {
  const [userData,setUserData] = useState({
    name:'Edward Vincent',
    image:profile_pic,
    email:'richardjameswap@gmail.com',
    phone:'+1 123 456 7890',
    address:{
      line1:'57th cross,richmond',
      line2:'circle,church road,London'
  },
    gender:'Male',
    dob:'2000-01-20'
  });
  const [isEdit,setIsEdit] = useState(true);
  return (
    <div>
      <img src={userData.image} alt='image'/>
      {
        isEdit
        ?<input type='text' value={userData.nmae} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))}/>
        :<p>{userData.name}</p>
      }
    </div>
  )
}

export default MyProfile