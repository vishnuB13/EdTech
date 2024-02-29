import React from "react";
import { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { Suspense } from "react";
import LoadingUI from "../UserComponents/Loading.js";
import TutorLogin from "./TutorLogin.js";
import axios from 'axios'
import { toast } from "react-toastify";
const OTPVerification = React.lazy(() => import('../TutorComponents/TutorOtp.js'));


let generatedotp

const TutorRegister = ({ isOpen, onClose }) => {
  // ... (other state variables)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpform, setOtpForm] = useState(false)
  const [otpReady, setOtpReady] = useState(false);
  const [login,setLogin] = useState(false)
  const navigate = useNavigate()
  
 
    let formdata = {
        name:name,
      email:email,
      password:password
    }

  const handleLoginClick = async()=>{
   setLogin(true)
   navigate('/tutor/login')
  }
  const handleRegister = async () => {
    try {
      const resp = await axios.post('http://localhost:7000/tutor/register', formdata, {
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      if (resp.status !== 200) {
        throw new Error('error in network');
      } else {
       if(resp.data.message==='tutor already registered'){
        toast.error(resp.data.message,{
          position: 'top-right',
          autoClose: 3000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
       }else if(resp.data.message==='Network error or catch error'){
        toast.error(resp.data.message,{
          position: 'top-right',
          autoClose: 3000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
       }
       else{
        generatedotp = await resp.data.OTP
        console.log(generatedotp,"generatedotp")
        if (await resp.data.otpsend) {
          setOtpReady(true);
          setOtpForm(true);
        }
       } 
      }
    } catch (error) {
      console.error('Error during fetchFormResponse:', error.message); 
    }
  };

//   useEffect(() => {
//     if (otpform && generatedotp) {
//       setOtpReady(true);
//     }
//   }, [otpform]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto`} 
    >
  {login ? (
    <TutorLogin />
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="border border-blue-300 bg-white w-full max-w-md p-6 rounded-md shadow-md">
        {otpReady ? (
          <OTPVerification name={name} email={email} password={password} OTP={generatedotp} />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
           
              <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Your Name"
              />
            </div>

            <div className="mb-4">
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

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="********"
              />
            </div>

            <button
              type="button"
              onClick={handleRegister}
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Register
            </button>
            <h1>OR</h1>
            <p>Already registered?</p>

            <button type = "button"
            onClick={handleLoginClick}
            className="bg-pink-500 text-white p-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          

          <button
            onClick={onClose}
            className="mt-4 text-blue-500 hover:underline cursor-pointer"
          >
            Cancel
          </button>
          </form>
          </>
        )}
      </div>
    </div>
  )}

    </div>
  );
};

export default TutorRegister;


