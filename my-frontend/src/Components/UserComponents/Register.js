import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { Suspense } from "react";
import LoadingUI from "./Loading.js";
import Login from "./Login.js";
import axios from 'axios'
import { toast } from "react-toastify";
import baseURL from "../../apiConfig.js";
import toastoptions from "../../toastConfig.js";
const OTPVerification = React.lazy(() => import('./Otp.js'));


let generatedotp


const RegisterModal = ({ isOpen, onClose }) => {
  // ... (other state variables)
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("")
  const [otpform, setOtpForm] = useState(false)
  const [otpReady, setOtpReady] = useState(false);
  const [login, setLogin] = useState(false)


  let formdata = {
    name: name,
    email: email,
    password: password
  }

  const handleLoginClick = async () => {
    setLogin(true);
    navigate('/login');
  }
  const handleCancel = async () => {
    navigate('/')
  }
  const handleRegister = async () => {


    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!email) { toast.error("please provide email", toastoptions) }
      else if (password !== password2) { toast.error("Passwords not matching", toastoptions) }
      else if (!password || !password2) { toast.error('please provide password', toastoptions) }
      else if (!emailRegex.test(email)) {
        toast.error('Incorrect Email Format', toastoptions)
      }
      else {
        const resp = await axios.post(`${baseURL}/user/register`, formdata, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (resp.status !== 200) {
          throw new Error('error in network');
        } else {
          if (resp.data.message === 'user already registered') {
            toast.error(resp.data.message, toastoptions)
          } else if (resp.data.message === 'Network error or catch error') {
            toast.error(resp.data.message, toastoptions)
          }
          else {
            generatedotp = await resp.data.OTP
            if (await resp.data.otpsend) {
              setOtpReady(true);
              setOtpForm(true);
            }
          }
        }
      }


    } catch (error) {
      console.error('Error during fetchFormResponse:', error.message);
    }
  };

  useEffect(() => {
    if (otpform && generatedotp) {
      setOtpReady(true);
    }
  }, [otpform]);

  return (
    <div
      className={`${isOpen ? "block" : "hidden"
        } fixed inset-0 overflow-y-auto`}
    >
      <Suspense fallback={<LoadingUI />}>
        {login ? (
          <Login />
        ) : (
          <div className="flex items-center fixed inset-0 justify-center h-screen bg-gradient-to-r from-pink-400 to-teal-500">
            <div className="border border-blue-300 bg-gradient-to-r from-teal-500 to-pink-400 w-full max-w-md p-6 rounded-md shadow-md flex flex-col items-center">
              {otpReady ? (
                <OTPVerification name={name} email={email} password={password} OTP={generatedotp} />
              ) : (
                <>
                  <h2 className="text-2xl text-white font-bold mb-4">Register</h2>

                  <form>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-white">
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
                      <label htmlFor="email" className="block text-sm font-medium text-white">
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
                      <label htmlFor="password" className="block text-sm font-medium text-white">
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

                    <div className="mb-4 w-full">
                      <label htmlFor="confirm password" className="block text-sm font-medium text-white">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
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
                    <h1 className="text-white mb-2" >OR</h1>
                    <p className="text-white mb-2">Already registered?</p>

                    <button type="button"
                      onClick={handleLoginClick}
                      className="bg-pink-500 text-white p-2 rounded-md hover:bg-blue-600">
                      Login
                    </button>


                    <button
                      onClick={handleCancel}
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
      </Suspense>

    </div>
  );
};

export default RegisterModal;


