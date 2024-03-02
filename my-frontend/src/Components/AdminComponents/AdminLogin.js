import React, { useState} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'
import { useAdminLoginContext } from '../../Context/AdminContext';



const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isAdminLoggedIn, adminlogin} = useAdminLoginContext()
 

  const handleLogin = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!email || !password){
       toast.error("Provide Email and password",{
        position: 'top-right',
        autoClose: 3000, // milliseconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
       })
      }else if(!emailRegex.test(email)){
        toast.error("Incorrect Email format",{
          position: 'top-right',
          autoClose: 3000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
         })
      }else{
        let formdata = {
          email: email,
          password: password,
        };
    
        const accesstoken = Cookies.get('admintoken');
        console.log(accesstoken, 'in admin side');
    
        let resp = await axios.post(
          'http://localhost:7000/admin/login',
          formdata,
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${accesstoken}`,
            },
          }
        );
    
        console.log(resp, 'resp');
        console.log('in login');
    
        if (resp.data && resp.data.accesstoken) {
          toast.success('Successfully logged', {
            position: 'top-right',
            autoClose: 3000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          Cookies.set('admintoken', resp.data.accesstoken, { expires: 7 });
          adminlogin()
          window.location.href = '/dashboard';
        }   else if(resp.data.message==='Invalid password'){
          toast.error("Invalid Password", {
            position: 'top-right',
            autoClose: 3000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }else if (resp.data.message==='incorrect token'){
          toast.error("Invalid token", {
            position: 'top-right',
            autoClose: 3000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
        else {
          toast.error(resp.data.message, {
            position: 'top-right',
            autoClose: 3000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
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
      <h1 className='text-2xl font-bold text-white mb-4 text-center'>Ed-Tech</h1>
        <form>
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
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="********"
            />
          </div>

          <div className="flex flex-col items-center">
  <button
    type="button"
    onClick={handleLogin}
    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mb-2"
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
  const accesstoken = Cookies.get('adminaccesstoken')
  const googleIn=async()=>{
  let resp = await axios.post('http://localhost:7000/admin/googlesign',data,{headers:{
    "Content-Type":"application/json",
    "Authorization":`Bearer ${accesstoken}`
  }})
  const token = resp.data.accesstoken
  adminlogin()
  
  Cookies.set('adminaccesstoken',token)
  window.location.href='/dashboard'
}
  googleIn()
}}

  onError={() => {
    console.log('Login Failed');
  }}
/>;
</div>
 </div>
   </form>
 </div>
</div>
  );
};

export default AdminLogin;
