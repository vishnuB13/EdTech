import React, { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import Logo from '../../logo.svg';
import Cookies from 'js-cookie';
import baseURL from '../../apiConfig';
import toastoptions from '../../toastConfig';
let accesstoken= Cookies.get('accesstoken')
let data = {accesstoken:accesstoken}
let tutoraccesstoken = Cookies.get('tutoraccesstoken')
let tutordata = {tutoraccesstoken:tutoraccesstoken}
let admintoken = await Cookies.get('admintoken')
let admindata = {admintoken:admintoken}




const Navbar = (prop) => {
  const [isOpen, setisOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()
  console.log(prop)
  console.log(prop.name,'in navbar')
  console.log(prop.userid,'user id in nav')
  console.log(prop.role,"roleeeeee")

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => { 
    setShowDropdown(false);
  };
  
  const handleLogout = async()=>{
    try {
      const resp = await axios.get(`${baseURL}/user/logout`)
      if(resp.data.message==='successfully logged out'){
        window.location.href='/'
      }else{
        toast.error("Logout unsuccessful",toastoptions)
      }
    } catch (error) {
      console.log(error,"errorin logout") 
      toast.error("catch error",toastoptions)
    }
    
  }

  const handleShowProfile = async()=>{
    try {
      navigate('/profile')
      
    } catch (error) {
      console.log(error,"error in showing profile")
    }
  }
  

  return (
    <>
      <nav className="bg-white p-5 flex justify-between items-center shadow-lg  ">
        <div className=" flex items-center">
          <img src={Logo} alt="Logo" className="mr-2 h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-black font-bold text-lg sm:text-xl md:text-2xl">ED-TECH</span>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button onClick={() => setisOpen(!isOpen)} className="text-blue-500 focus:outline-none sm:show">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {/* Your menu icon here */}
          </svg>
        </button>

        {/* Desktop Menu */}
        <ul className={`hidden sm:flex space-x-4 mr-5`}>
          <li><Link to='/home' className="text-black font-small"><span>Home</span></Link></li>
          <li><Link to='/about' className="text-black font-small"><span>About</span></Link></li>
          <li><Link to='/services' className="text-black font-small"><span>Services</span></Link></li>
          <li><Link to='/contact' className="text-black font-small"><span>Contact</span></Link></li>
          {accesstoken === undefined && tutoraccesstoken === undefined && admintoken === undefined ? (
  <li><Link to='/register' className="text-black font-small"><span>Login</span></Link></li>
) : (
  <li
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className="text-black font-small"
  style={{ position: 'relative' }}
>
  {prop.name}
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
      <li className='bg-gradient-to-r from-pink-500 to-teal-500' onClick={handleShowProfile} ><span>Profile</span></li>
      <li className='bg-gradient-to-r from-pink-500 to-teal-500' onClick={handleLogout}><span>Logout</span></li>
    </ul>
  )}
</li>)}    </ul>

        {/* Mobile Menu */}
        <ul className={`flex space-x-4 sm:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <li><Link to='/home' className="text-black font-small"><span>Logout</span></Link></li>
          <li><Link to='/about' className="text-black font-small"><span>About</span></Link></li>
          <li><Link to='/services' className="text-black font-small"><span>Services</span></Link></li>
          <li><Link to='/contact' className="text-black font-small"><span>Contact</span></Link></li>
          {accesstoken === undefined && tutoraccesstoken === undefined && admintoken === undefined ? (
  <li><Link to='/register' className="text-black font-small">Login</Link></li>
) : (
  <li
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  className="text-black font-small"
  style={{ position: 'relative' }}
>
  {prop.name}
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
      <li className='bg-gradient-to-r from-pink-500 to-teal-500' onClick={handleShowProfile} ><span>Profile</span></li>
      <li className='bg-gradient-to-r from-pink-500 to-teal-500' onClick={handleLogout}><span>Logout</span></li>
    </ul>
  )}
</li>)}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
