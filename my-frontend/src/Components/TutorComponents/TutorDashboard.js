import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import toastoptions from '../../toastConfig';
import baseURL from '../../apiConfig';
const handleTutorLogout =async()=>{
  try {
    const resp = await axios.get(`${baseURL}/tutor/logout`)
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

const TutorDashboard = () => { 
  return (
    <div className="flex h-screen">
      {/* Left Menu */}
      <div className="bg-gray-800 text-white w-1/5 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Tutor Dashboard</h1>
          <p>Welcome, Tutor!</p>
        </div>
        <ul>
          <li className="mb-2">
            <a href="/users" className="hover:text-blue-500">
              Users 
            </a>
          </li>
          <li className="mb-2">
            <a href="/tutor/modules" className="hover:text-blue-500">
              Upload modules
            </a>
          </li>
          <li className="mb-2">
            <a href="/courses" className="hover:text-blue-500">
              Notifications
            </a>
          </li>
          <li className="mb-2">
            <a href="/orders" className="hover:text-blue-500">
              Analytics
            </a>
          </li>
          <li className="mb-2">
            <a href="/orders" className="hover:text-blue-500">
              Module Management
            </a>
          </li>
          <li>
            <a href='/tutor/logout' onClick={handleTutorLogout} className="hover:text-red-500">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Your main content goes here */}
        <div>Welcome to Tutor Dashboard</div>
      </div>
    </div>
  );
};

export default TutorDashboard;
