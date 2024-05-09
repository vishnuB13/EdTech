import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import baseURL from '../../apiConfig'
import toastoptions from '../../toastConfig'
import { isStrongPassword } from '../../toastConfig'



const NewPassword = () => {
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state.email
   


    const handleVerify = async (e) => {
        e.preventDefault();
        const strongPassword = isStrongPassword(password)
        
        const data = { password: password, email: email };
        try {

            if (!password || !password2) {
                toast.error("Fill all fields", toastoptions);
            } else if (password !== password2) {
                toast.error("Password not matching",toastoptions );
            } else if (!strongPassword){
                toast.error(strongPassword.criteriaNotMet[0],toastoptions)
            }
             else {

               const response = await axios.put(`${baseURL}/user/change_password`, data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                
                if (response.data.message === 'Successfully Changed') {
                    toast.success("Successfully Changed", toastoptions)
                        navigate('/login')      
                }else if(response.data.message==='User Not Found'){
                    navigate('/register')
                    toast.error("Email not registered yet!",toastoptions)
                }
                 else {
                    toast.error(response.data.message, toastoptions);
                }
            }
        } catch (error) {
            console.error("Axios error in handleVerify:", error);

            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            } else if (error.request) {
                console.error("No response received. Request details:", error.request);
            } else {
                console.error("Error details:", error.message);
            }

            toast.error("An error occurred. Please try again.",toastoptions);
        }
    };
    return (
        <>
            <div className="flex items-center fixed inset-0 justify-center h-screen bg-gradient-to-r from-pink-500 to-teal-500">
                <div className="border border-blue-300 bg-gradient-to-r from-teal-500 to-pink-500 w-full max-w-md p-6 rounded-md shadow-md flex flex-col items-center">
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            New Password
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

                    <div className="mb-4">
                        <label htmlFor="password2" className="block text-sm font-medium text-gray-600">
                            Confirm New Password
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
                    <button onClick={handleVerify} className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                        Save Changes
                    </button>
                </div>
            </div>
        </>
    )
}

export default NewPassword