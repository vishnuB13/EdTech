import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
import Logo from '../../logo.svg';
import Cookies from 'js-cookie';
let accesstoken= Cookies.get('accesstoken')
let data = {accesstoken:accesstoken}
let tutoraccesstoken = Cookies.get('tutoraccesstoken')
let tutordata = {tutoraccesstoken:tutoraccesstoken}


const Navbar = ({name}) => {
  const [isOpen, setisOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(name,'in navbar')

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };
  
  const handleLogout = async()=>{
    try {
      const resp = await axios.get('http://localhost:7000/user/logout')
      if(resp.data.message==='successfully logged out'){
        window.location.href='/'
      }else{
        toast.error("Logout unsuccessful",{
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      console.log(error,"errorin logout") 
    }
   
  }
  

  return (
    <>
      <nav className="bg-gradient-to-r from-pink-500 to-teal-500  flex justify-between items-center   ">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="mr-2 h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-blue-300 font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl">ED-TECH</span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button onClick={() => setisOpen(!isOpen)} className="text-white focus:outline-none sm:hidden">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {/* Your menu icon here */}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className={`hidden sm:flex space-x-4`}>
          <li><Link to='/home' className="text-white font-bold">Home</Link></li>
          <li><Link to='/about' className="text-white font-bold">About</Link></li>
          <li><Link to='/services' className="text-white font-bold">Services</Link></li>
          <li><Link to='/contact' className="text-white font-bold">Contact</Link></li>
          {accesstoken === undefined && tutoraccesstoken === undefined ? (
  <li><Link to='/register' className="text-white font-bold">Login</Link></li>
) : (
  <li
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className="text-white font-bold"
  style={{ position: 'relative' }}
>
  {name}
  {showDropdown && (
    <ul
      style={{
        position: 'absolute',
        top: '100%', 
        left: 0,
        backgroundColor: 'white', 
        border: '1px solid #ccc',
        zIndex: 1,
      }}
    >
      <li>Profile</li>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  )}
</li>)}    </ul>

        {/* Mobile Menu */}
        <ul className={`flex space-x-4 sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <li><Link to='/home' className="text-white font-bold">Home</Link></li>
          <li><Link to='/about' className="text-white font-bold">About</Link></li>
          <li><Link to='/services' className="text-white font-bold">Services</Link></li>
          <li><Link to='/contact' className="text-white font-bold">Contact</Link></li>
          {accesstoken === undefined && tutoraccesstoken === undefined ? (
  <li><Link to='/register' className="text-white font-bold">Login</Link></li>
) : (
  <li
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className="text-white font-bold"
  style={{ position: 'relative' }}
>
  {name}
  {showDropdown && (
    <ul
      style={{
        position: 'absolute',
        top: '100%', // position it just below the parent
        left: 0,
        backgroundColor: 'black', // adjust styles as needed
        border: '1px solid #ccc',
        zIndex: 1,
      }}
    >
      <li>Profile</li>
      <li onClick={handleLogout}>Logout</li>
    </ul>
  )}
</li>)}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
