

import React, { useState } from 'react';
import Modal from 'react-modal';
import toastoptions from '../../toastConfig';
import { toast } from 'react-toastify';
import axios from 'axios'
import baseURL from '../../apiConfig.js';


const CategoryAdd = ({isOpen, closeModal }) => {
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const CLOUD_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_URL;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setCategoryName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ name, image, description });
    const formData = {coursename:name,courseImage:image,courseDescription:description}

   let result =  await axios.post(`${baseURL}/admin/category-add`,formData)
   if(result.data.message==='Category Successfully Created'){
    toast.success(result.data.message,toastoptions)
   }
   else{toast.error(result.data.message,toastoptions)}
    // Close modal
    closeModal();
  };

  const imageUpload=(e)=>{
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
              const secureUrl = await data.secure_url; // Accessing secure_url directly
              setImage(secureUrl);
              toast.success("Image selected", toastoptions);
            } else {
              toast.error("Error selecting image", toastoptions);
            }
          })
          .catch((error) => {
            console.error("An error occurred:", error);
            // Handle specific error types if needed (e.g., timeout errors)
          });
    
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle specific error types if needed (e.g., timeout errors)
      }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000, // Ensure the modal appears above other elements
          },
          content: {
            width: '400px',
            margin: 'auto',
            backgroundColor: 'white', // Set background color for the modal content
            padding: '20px', // Add padding to the modal content
            borderRadius: '8px', // Add border radius to the modal content
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Category Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
          <label className="block mb-2">Category Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e)=>{imageUpload(e)}}
                  className="border border-gray-400 rounded py-1 px-2 outline-none"
                />
              </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
          <button type="submit" onClick={(e)=>{ e.preventDefault()
            closeModal()}} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-pink-600">Close</button>

        </form>
      </Modal>
    </div>
  );
};

export default CategoryAdd;
