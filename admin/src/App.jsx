import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
const App = () => {
  const {atoken} = useContext(AdminContext)
  return atoken?(
    <div className=''>
      <ToastContainer/>
      <Navbar/>
    </div>
  ):(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App