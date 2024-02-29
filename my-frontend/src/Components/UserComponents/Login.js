import axios from 'axios';
import React, { useState } from 'react';
import {toast} from 'react-toastify'
import Cookies from 'js-cookie';
import { useLoginContext } from '../../Context/LoginContext';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoggedIn, login }=useLoginContext()  

  const handleLogin = async () => {
    // Your login logic goes here
  try {
    let formdata = {
      email:email,
      password:password
    }
    let accesstoken = Cookies.get('accesstoken')
    let resp = await axios.post('http://localhost:7000/user/login',formdata,{headers:{
      "Content-Type":"application/json",
      "Authorization":`Bearer ${accesstoken}`
    }})
    if(resp.data.message==='Successfully Logged'){
      console.log(isLoggedIn,"before login")
      login()
      console.log(isLoggedIn,"after login")
      toast.success("Successfully Logged", {
        position: 'top-right',
        autoClose: 3000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
        // After the toast is completed, redirect to the home page
        console.log(isLoggedIn,"is logged")
        Cookies.set('accesstoken', resp.data.accesstoken, { expires: 7 });
        window.location.href='/home'
      
    }
    else if(resp.data.message==='Invalid password'){
      toast.error("Invalid Password", {
        position: 'top-right',
        autoClose: 3000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }else {
      toast.error(resp.data.message, {
        position: 'top-right',
        autoClose: 3000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  } catch (error) {
    console.log("Axios Error:", error);  // Log the error to the console

  toast.error(`Axios Error: ${error.message}`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  }
    
  };

  const handleForgotPassword = () => {
    // Your forgot password logic goes here
    console.log('Forgot password for:', email);

  };
 

  return (
    <div className="flex items-center fixed inset-0 justify-center h-screen bg-gradient-to-r from-pink-500 to-teal-500">
    <div className="border border-blue-300 bg-gradient-to-r from-teal-500 to-pink-500 w-full max-w-md p-6 rounded-md shadow-md flex flex-col items-center">
      <h1 className='text-2xl font-bold text-white  mb-4 text-center'>Ed-Tech</h1>
      <form className="w-full">
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
  
        <div className="mb-4 w-full">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
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
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-2 w-full"
        >
          Login
        </button>
  
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-white hover:underline cursor-pointer mb-2"
        >
          Forgot Password?
        </button>
     
  
      <div className="mt-4">
      <GoogleLogin
  onSuccess={credentialResponse => {
  const decoded = jwtDecode(credentialResponse.credential)
  const email = decoded.email
  const name = decoded.given_name
  const data = {email:email,name:name}
  const accesstoken = Cookies.get('accesstoken')
  const googleIn=async()=>{
  let resp = await axios.post('http://localhost:7000/user/googlesign',data,{headers:{
    "Content-Type":"application/json",
    "Authorization":`Bearer ${accesstoken}`
  }})
  const token = resp.data.accesstoken
  login()
  
  Cookies.set('accesstoken',token)
  window.location.href='/home'
}
  googleIn()
}}

  onError={() => {
    console.log('Login Failed');
  }}
/>;
       </div>
      </form>
    </div>
  </div>
  )  
};

export default Login;
