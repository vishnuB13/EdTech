import React, { useEffect, useState } from 'react';
import firstFrame from '../../images/firstFrame.jpg';
import defaultImage from '../../images/defaultimage.jpg'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import baseURL from '../../apiConfig';
import toastoptions from '../../toastConfig';

const Profile = (prop) => {
  const CLOUD_KEY = process.env.REACT_APP_API_KEY;
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const CLOUD_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState([])
  const navigate = useNavigate()
  console.log(prop.userid, "userid in profile");

  const [image, setImage] = useState("")
  const [userid, setUserid] = useState(prop.userid)
  const [role, setRole] = useState(prop.role)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(role,"in fetch datraaa")
        
        const result = await axios.get(`${baseURL}/${role}/${prop.userid}`);
        setName(result.data.name || "");
        setEmail(result.data.email || "");
        setGender(result.data.gender || "");
        setImage(result.data.image || "")
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleProfileEdit = async () => {
    try {
      if (!name || !email || !gender) { toast.error("Please fill all fields", toastoptions) }
      else if (!image) { toast.error("Wait for the image to upload", toastoptions) }
      else {
        let changed = { name: name, email: email, gender: gender, image: image, interests: interests };
        let data = await axios.put(`${baseURL}/${role}/${prop.userid}`, changed);
        if (data.data.message === 'User updated successfully') {
          toast.success("successfully updated", toastoptions)
          navigate('/profile')
        } else {
          toast.error(data.data.message, toastoptions)
        }
      }
    } catch (error) {
      console.log(error, "error in handle profile edit");
    }
  }

  const handleAddInterest = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setInterests([...interests, e.target.value.trim()]);
      e.target.value = ''; // Clear the input field after adding the interest
    }
  };


  const handleProfilePhotoChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        console.log("No file selected.");
        return;
      }

      const formData = new FormData();
      const PRESET_NAME = 'xsqednh0';
      formData.append('file', file);
      formData.append('upload_preset', PRESET_NAME);
      formData.append('cloud_name', CLOUD_NAME);

      console.log("Uploading file...");

      // 1. Check internet connection (optional)
      if (!navigator.onLine) {
        console.error("No internet connection available. Please try again later.");
        return;
      }

      fetch(CLOUD_UPLOAD_URL, {
        method: "POST",
        body: formData
      })
        .then((response) => {
          return response.json();
        })
        .then(async (data) => {
          if (data) {
            const secureUrl = await data.secure_url;
            setImage(secureUrl);
            toast.success("Image selected", toastoptions);
          } else {
            toast.error("Error selecting image", toastoptions);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <div className="bg-gradient-to-r from-teal-500 to-pink-500 flex flex-col justify-center items-center h-screen">
      <div className=" flex items-center justify-center h-full">
        <div className=" flex flex-col  items-center justify-center h-full">


          <div className="bg-gradient-to-r from-pink-500 to-teal-500 p-6 mr-20 bg-gray-100 rounded-lg shadow-md max-w-full max-w-md flex flex-col items-center justify-center w-full md:ml-4">
            <div className='w-full'>
              <div className='text-bold text-large justify-center text-center mb-10 h-100'>
                <h1 className='text-white text-bold' style={{ fontWeight: 'bold', fontSize: '24px' }}>Profile</h1>
              </div>
              <div className='grid grid-cols-1 gap-4 mb-4'>
                <img
                  src={firstFrame}
                  alt="Your Alt Text"
                  className="w-full h-auto md:max-w-md object-contain"
                />
              </div>
            </div>
          </div>
        </div>


        <div className="bg-gradient-to-r from-pink-500 to-teal-500 mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-full max-w-md flex flex-col items-center justify-center w-full">
          <div className="w-full justify-center items-center">
            <div className="grid grid-cols-1 gap-4 mb-4">
              {image ? (
                <div className=' flex items-center justify-center rounded-full'>
                  <img
                    src={image}
                    alt="Default Image"
                    className="bg-black max-w-full h-auto object-contain rounded-full w-20 h-20"
                  />
                </div>
              ) : (
                <div className='flex items-center justify-center rounded-full '>
                  <img
                    src={defaultImage}
                    alt="Default Image"
                    className="max-w-full h-auto object-contain rounded-full w-20 h-20"
                  />
                </div>
              )}

              <div className="flex items-center">
                <span className="mr-2 text-white ">photo :</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProfilePhotoChange(e)}
                  className="border border-white-400 text-white rounded py-1 px-2 outline-none"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-white">name :</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-400 rounded py-1 px-2 outline-none"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-white">email :</span>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-400 rounded py-1 px-2 outline-none"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-white">Gender:</span>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border border-gray-400 rounded py-1 px-2 outline-none"
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2 text-white">Interests:</span>
                <input
                  type="text"
                  onKeyPress={handleAddInterest}
                  className="border border-gray-400 rounded py-1 px-2 outline-none"
                /> 
              </div>
              <div>
        {interests.map((interest, index) => (
          <span key={index} className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm m-1">
            {interest}
          </span>
        ))}
      </div>
            </div>
            <div className='flex justify-center items-center'>
              <button
                onClick={handleProfileEdit}
                className="bg-gradient-to-r from-teal-500 to-pink-500 border-red-500 hover:bg-blue-700 flex justify-center items-center text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>


  );


};

export default Profile;
