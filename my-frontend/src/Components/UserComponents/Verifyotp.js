import React from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import baseURL from '../../apiConfig';
import toastoptions from '../../toastConfig';

const Verifyotp = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const email = location.state.email;
  const OTP = location.state.OTP
  const [enteredOTP, setEnteredOTP] = useState("");
  const [timer, setTimer] = useState(60);
  const [expired, setExpired] = useState(false);
  const [verify,setVerify]=useState(true)
  const [resendButton, setResendButton] = useState(false);
  const [otpform,setOtpForm]=useState(false) 


  useEffect(() => {
    const countdown = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setVerify(false) 
        setResendButton(true);
        setExpired(true);
      }
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer, expired]);

  const handleVerify = async(e)=>{
    e.preventDefault()
   let response = await axios.post(`${baseURL}/user/password_otp`,{email:email,OTP:OTP,enteredOTP:enteredOTP},{
      headers:{
        "Content-Type":"application/json"
      }
    })
   if(response.data.message==='correct otp'){
    navigate('/new_password', { state: { email } });
  }else if(response.data.message==='incorrect otp'){
    toast.error("incorrect otp",toastoptions)
  }
  else{
    navigate('/login')
   }
  }

  const handleResendOTP = async () => {
    try {
      setVerify(true)
      setTimer(60); // Reset timer
      setExpired(false);
      setResendButton(false);
      // Add logic to resend OTP
      const bodydata = {  email:email };

     
        // try {
          let data = await axios.post(`${baseURL}/user/resend-otp`, bodydata, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if(data.data.otpsend){
            setOtpForm(true)
           }else{
            toast.error("otp resending error",toastoptions)
          }
    } catch (error) {
      console.error('Error in resending OTP:', error);
    }
  };

  return (
    <>
     <div className="mx-auto max-w-md p-4 bg-white border rounded-md shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
      <p className="text-gray-600">We have sent an OTP to your email address.</p>
      <label htmlFor="otp" className="block text-sm font-medium text-gray-600 mt-4">
        Enter OTP:
      </label>
      <input
        type="text"
        id="otp"
        name="otp"
        value={enteredOTP}
        onChange={(e) => setEnteredOTP(e.target.value)}
        className="mt-1 p-2 w-full border rounded-md"
      />
      {verify&& <button
        onClick={handleVerify}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Verify OTP
      </button>}

      {timer>0 ? (<p className="text-color-blue-500">Your OTP will expire in {timer} seconds</p>):(<p>Otp expired! Resend?</p>)}

      {resendButton && (
        <button
          onClick={handleResendOTP}
          className="mt-4 bg-pink-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Resend OTP
        </button>
      )}
    </div>
    </>
  )
}

export default Verifyotp