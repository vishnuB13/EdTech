// OTP.js
import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useLoginContext } from "../../Context/LoginContext";

const OTPVerification = ({ name, email, password, OTP }) => {
  const [enteredOTP, setEnteredOTP] = useState("");
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [expired, setExpired] = useState(false);
  const [resendButton, setResendButton] = useState(false);
  const { login, logout } = useLoginContext();

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setResendButton(true);
        setTimer(60);
        setExpired(true);
      }
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer, expired]);

  const handleVerify = async () => {
    const bodydata = { name, email, password };

    if (enteredOTP === OTP) {
      // If OTP is correct, you can proceed with further actions
      console.log("OTP verification successful");
      try {
        let data = await axios.post('http://localhost:7000/tutor/verify-otp', bodydata, {
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
          ).then(() => {
            // After the toast is completed, redirect to the home page
            Cookies.set('tutoraccesstoken', data.data.tutoraccesstoken, { expires: 7 });
            login();
            window.location.href = '/tutor/dashboard';
          });
        } else {
          toast.error(data.data.message, {
            position: 'top-right',
            autoClose: 3000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.log('error in toast');
        }
      } catch (error) {
        console.error('Error in OTP verification:', error);
      }
    } else if (expired) {
      toast.error("OTP has expired", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
      });
      setExpired(false);
    } else {
      // Handle incorrect OTP
      toast.error("Incorrect OTP", {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("Incorrect OTP");
      // You can show an error message or take appropriate action
    }
  };

  const handleResendOTP = async () => {
    try {
      setTimer(60); // Reset timer
      setExpired(false);
      setResendButton(false);
      // Add logic to resend OTP
      const bodydata = { name, email, password };

      if (enteredOTP === OTP) {
        // If OTP is correct, you can proceed with further actions
        try {
          let data = await axios.post('http://localhost:7000/tutor/verify-otp', bodydata, {
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
            ).then(() => {
              // After the toast is completed, redirect to the home page
              Cookies.set('tutoraccesstoken', data.data.tutoraccesstoken, { expires: 7 });
              login();
              window.location.href = '/tutor/dashboard';
            });
          } else {
            toast.error(data.data.message, {
              position: 'top-right',
              autoClose: 3000, // milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            console.log('error in toast');
          }
        } catch (error) {
          console.error('Error in OTP verification:', error);
        }
      } else if (expired) {
        toast.error("OTP has expired", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
        });
        setExpired(false);
      } else {
        // Handle incorrect OTP
        toast.error("Incorrect OTP", {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        logout();
        console.log("Incorrect OTP");
        // You can show an error message or take appropriate action
      }
     
      // Add logic to resend OTP (e.g., make an API call to request a new OTP)
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
      <button
        onClick={handleVerify}
        className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Verify OTP
      </button>
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

export default OTPVerification;
