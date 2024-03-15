import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import baseURL from '../../apiConfig';
import toastoptions from '../../toastConfig';

const ForgotPassword = () => {
const [email,setEmail] = useState('')
const navigate = useNavigate()

const handleResetPassword = async(e)=>{
    e.preventDefault()
    let response = await axios.post(`${baseURL}/user/send_otp`,{email:email},
    {headers:{
        "Content-Type":"application/json"
    }}
    )
    if(response.data.message==='Otp send successfully'){
        navigate('/otp_verification', { state: { email: email, OTP:response.data.OTP } })
    }
    else{
        toast.error('otp sending failed',toastoptions)
    }
}


  return (
    <>
      <div className="flex items-center fixed inset-0 justify-center h-screen bg-gradient-to-r from-pink-500 to-teal-500">
      <div className="border border-blue-300 bg-gradient-to-r from-teal-500 to-pink-500 w-full max-w-md p-6 rounded-md shadow-md flex flex-col items-center">
      <h1 className='text-2xl font-bold text-white  mb-4 text-center'>Ed-Tech</h1>
        <h2 className="text-2xl text-white font-semibold mb-6">Forgot Password</h2>

        <form >
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="your.email@example.com"
          />
        </div>
          <button
            type="submit"
            onClick={handleResetPassword}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default ForgotPassword;
