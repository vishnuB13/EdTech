// OTP.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useTutorLoginContext } from "../../Context/TutorContext";
import baseURL from "../../apiConfig";
import toastoptions from "../../toastConfig";

const OTPtutorVerification = ({ name, email, password, OTP }) => {
  const navigate = useNavigate()
  const [enteredOTP, setEnteredOTP] = useState("");
  const [generatedotp, setGenerate] = useState("");
  const [verifybutton, setVerifyButton] = useState(true)
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [expired, setExpired] = useState(false);
  const [resendButton, setResendButton] = useState(false);
  const { tutorlogin, tutorlogout } = useTutorLoginContext();

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setVerifyButton(false)
        setResendButton(true);
        setTimer(60);
        setExpired(true);
      }
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer, expired]);
  useEffect(() => {
    setGenerate(OTP); // Update generatedotp state with OTP
  }, [OTP]);

  const handleVerify = async () => {
    setGenerate(OTP); // Update generatedotp state with OTP
    const bodydata = { name, email, password };
    console.log(enteredOTP, "entered otp")
    console.log(OTP, 'received otp')
    if (enteredOTP === OTP) {
      // If OTP is correct, you can proceed with further actions
      try {
        let data = await axios.post(`${baseURL}/tutor/verify-otp`, bodydata, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(data, "data received");
        console.log(data.data.message, "message response");

        if (data.data.message === 'Successfully registered') {
          toast.promise(
            Promise.resolve(),
            {
              pending: 'Processing...',
              success: 'Successfully registered',
              error: 'Registration failed',
            },
            {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          ).then((data) => {
            // After the toast is completed, redirect to the home page
            console.log(data,"data in tutor registration")
            Cookies.set('tutoraccesstoken', data.data.tutoraccesstoken, { expires: 7 });
            tutorlogin();
            navigate('/tutor/login');
          });
        } else {
          toast.error(data.data.message, toastoptions);
          console.log('error in toast');
        }
      } catch (error) {
        console.error('Error in OTP verification:', error);
      }
    } else if (expired) {
      toast.error("OTP has expired", toastoptions);
      setExpired(false);
    } else {
      // Handle incorrect OTP
      toast.error("Incorrect OTP", toastoptions);
      console.log("Incorrect OTP");
      // You can show an error message or take appropriate action
    }
  };

  const handleResendOTP = async () => {
    try {
      setVerifyButton(true)
      setTimer(60); // Reset timer
      setExpired(false);
      setResendButton(false);
      // Add logic to resend OTP
      const bodydata = { name, email, password, OTP };
      console.log(name, "name in verify otp")


      let data = await axios.post(`${baseURL}/tutor/resend-otp`, bodydata, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (data.data.otpsend) {
        setGenerate(data.data.OTP)
      } else {
        toast.error("otp resending error", toastoptions)
      }
    } catch (error) {
      console.error('Error in resending OTP:', error);
    }
  };

  return (
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
      {verifybutton && <button
        onClick={handleVerify}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Verify OTP
      </button>}
      <p className="text-color-blue-500">Your OTP will expire in {timer} seconds</p>
      {resendButton && (
        <button
          onClick={handleResendOTP}
          className="mt-4 bg-pink-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OTPtutorVerification;
