import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/UserComponents/Navbar.js';
import Footer from './Components/UserComponents/Footer.js';
import LandingPage from './Components/UserComponents/LandingPage.js';
import About from './Components/UserComponents/About.js';
import Services from './Components/UserComponents/Services.js';
import Contact from './Components/UserComponents/Contact.js';
import RegisterModal from './Components/UserComponents/Register.js';
import Profile from './Components/UserComponents/Profile.js';
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
import { useAdminLoginContext } from './Context/AdminContext.js';
import Cookies from 'js-cookie';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const {isLoggedIn,login,logout}=useLoginContext()
  const {isTutorLoggedIn} = useTutorLoginContext()
  const {isAdminLoggedIn} = useAdminLoginContext()
  const [name,setName] = useState('')
useEffect(()=>{
 const accesstoken = Cookies.get('accesstoken')
 const ifLogged=async()=>{
  if(accesstoken){
    axios.defaults.withCredentials=true
        const response = await axios.post('http://localhost:7000/user/details',{},{
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
 ifLogged()
},[])
  // useEffect(() => {
  //   const accessToken = Cookies.get('accesstoken');

  //   if (accessToken) {
  //     login();
  //   } else {
  //     logout();
  //   }
  // }, [login, logout]);

  // useEffect(()=>{
  //   const tutoraccessToken = Cookies.get('tutoraccesstoken')
  //   console.log(tutoraccessToken,"in useffect in app.js")
  //   if(tutoraccessToken){
  //     tutorlogin()
  //   }else{
  //     tutorlogout()
  //   }
  // },[tutorlogin,tutorlogout])

  // useEffect(()=>{
  //   const adminToken = Cookies.get('admintoken')
  //   console.log(adminToken,"in useeffect in app.js admintoken")
  //   if(adminToken){
  //     adminlogin()
  //   }else{adminlogout()}
  // },[])
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
    {isAdminLoggedIn===false && <Navbar name={name} />}  
      <Footer />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<RegisterModal isOpen={isModalOpen} onClose={handleCloseModal}/>} />
          <Route path='/home'  element={isLoggedIn ? <Home name={name}/>:<Navigate to='/login'/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={isLoggedIn===false?(<Login />):(<Navigate to='/home'/>)} />

          <Route path='*' element={<Notfound />} />

          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/dashboard' element={isAdminLoggedIn?(<Dashboard />):<Navigate to='/admin'/>} />

          <Route path='/tutor' element={isTutorLoggedIn===false && <TutorRegister isOpen={isModalOpen} onClose={handleCloseModal} />} />
          <Route path='/tutor/login' element={isTutorLoggedIn===false?(<TutorLogin />):(<Navigate to='/tutor/dashboard' />)} />
          <Route path='/tutor/dashboard' element={isTutorLoggedIn? <TutorDashboard />:<Navigate to='/tutor/login'/>} />

        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;