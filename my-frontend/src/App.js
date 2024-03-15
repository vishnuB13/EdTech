import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import baseURL from './apiConfig.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAdminAuthenticated, setAdminAuthenticated } from './redux/slices/adminAuthSlice.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/UserComponents/Navbar.js';
import Footer from './Components/UserComponents/Footer.js';
import LandingPage from './Components/UserComponents/LandingPage.js';
import About from './Components/UserComponents/About.js';
import Services from './Components/UserComponents/Services.js';
import Contact from './Components/UserComponents/Contact.js';
import RegisterModal from './Components/UserComponents/Register.js';
import Profile from './Components/UserComponents/Profile.js';
import ForgotPassword from './Components/UserComponents/forgotPassword.js';
import Otpverify from './Components/UserComponents/Verifyotp.js';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/UserComponents/Home.js';
import Login from './Components/UserComponents/Login.js';
import Notfound from './Components/UserComponents/Notfound.js';
import AdminLogin from './Components/AdminComponents/AdminLogin.js';
import Dashboard from './Components/AdminComponents/Dashboard.js';
import TutorDashboard from './Components/TutorComponents/TutorDashboard.js';
import TutorLogin from './Components/TutorComponents/TutorLogin.js';
import TutorRegister from './Components/TutorComponents/TutorRegister.js'

import { useLoginContext } from './Context/LoginContext.js';
import { useTutorLoginContext } from './Context/TutorContext.js';

import Cookies from 'js-cookie';
import NewPassword from './Components/UserComponents/NewPassword.js';

 function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const {isLoggedIn,login,logout}=useLoginContext()
  const isAdminAuthenticated = useSelector(selectIsAdminAuthenticated);
  console.log(isAdminAuthenticated,"in authenticate app.js")
  const dispatch = useDispatch()

  const {isTutorLoggedIn,tutorlogin,tutorlogout} = useTutorLoginContext()
  const [name,setName] = useState('')
useEffect(()=>{
 const accesstoken = Cookies.get('accesstoken')
 const ifLogged=async()=>{
  if(accesstoken){
    axios.defaults.withCredentials=true
        const response = await axios.post(`${baseURL}/user/details`,{},{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`
          },
        })
        console.log(response,"response in appjs user details")
        if(response.data.message === 'Invalid token'){logout()}
        else{
          let nama = response.data.user.name
          setName(nama)
          if(nama){
            login()
          }
          else{
            logout()
          }
        }
       
   }else{
    logout()
   }
 }
const ifTutorLogged = async()=>{
  const tutoraccessToken = Cookies.get('tutoraccesstoken')
  if(tutoraccessToken){
    axios.defaults.withCredentials=true
        const response = await axios.post(`${baseURL}/tutor/details`,{},{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accesstoken}`
          },
        })
        console.log(response,"response in appjs user details")
        if(response.data.message === 'Invalid token'){tutorlogout()}
        else{
          let nama ="Tutor"
          console.log(nama, "name of tutor")
          setName(nama)
          if(nama){
            tutorlogin()
          }
          else{
            tutorlogout()
          }
        }
}}
const ifAdminLogged = async () => {
  const adminaccesstoken = Cookies.get('admintoken');
  if (adminaccesstoken) {
    axios.defaults.withCredentials = true;
    const response = await axios.post(
      `${baseURL}/admin/details`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminaccesstoken}`
        },
      }
    );
    if (response.data.message === 'Invalid token') {
       dispatch(setAdminAuthenticated(false))
    } else if(response.data.admin) {
      let nama = "Admin";
    
      if (nama) {
        setName(nama);
        await dispatch(setAdminAuthenticated(true))
      } else {
       dispatch(setAdminAuthenticated(false)
       )
      }
    }
    else{dispatch(setAdminAuthenticated(false))}
  }
};



 const authCall = async()=>{
 await ifLogged()
 await ifTutorLogged()
 await ifAdminLogged()
 }
 authCall()
},[])

  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Router>
     <Navbar name={name} /> 
      

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<RegisterModal isOpen={isModalOpen} onClose={handleCloseModal}/>} />
          <Route path='/home'  element={isLoggedIn ? <Home name={name}/>:<Navigate to='/login'/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={isLoggedIn===false?(<Login />):(<Navigate to='/home'/>)} />
          <Route path='/forgot_password' element={<ForgotPassword />} />
          <Route path='/otp_verification' element={<Otpverify />} />
          <Route path='/new_password' element={<NewPassword />} />
          

          <Route path='*' element={<Notfound />} />

          <Route path='/admin' element={!isAdminAuthenticated ? (<AdminLogin />):(<Navigate to='/dashboard' />) } />
          <Route path='/dashboard' element={isAdminAuthenticated===true ? (<Dashboard name={name} />):(<Navigate to='/admin' />) } />

          <Route path='/tutor' element={isTutorLoggedIn===false ? (<TutorRegister isOpen={isModalOpen} onClose={handleCloseModal} />):(<Navigate to='/tutor/dashboard' />)} />
          <Route path='/tutor/login' element={isTutorLoggedIn===false?(<TutorLogin />):(<Navigate to='/tutor/dashboard' />)} />
          <Route path='/tutor/dashboard' element={isTutorLoggedIn? <TutorDashboard />:<Navigate to='/tutor/login'/>} />

        </Routes>
        <ToastContainer />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
