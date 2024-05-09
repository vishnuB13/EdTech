import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../apiConfig';
import { toast } from 'react-toastify';
import toastoptions from '../../toastConfig';

const ModuleAdd = () => {
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [moduleImage, setModuleImage] = useState('');
  const [videoUrls, setVideoUrls] = useState([]);
  const [tutorName, setTutorName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedCourses, setSelectedCourses] = useState("")
  const [coursePrice, setCoursePrice] = useState("")
  const [image, setImage] = useState("")
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const CLOUD_UPLOAD_URL = process.env.REACT_APP_CLOUDINARY_URL;

  useEffect(() => {
    // Fetch categories from the database
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/category`); // Assuming you have an endpoint to fetch categories
        console.log(response.data, "categories from database")
        setCategories(response.data);
        console.log(categories, "data");
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

   

    const fetchCourses = async ()=>{
      try {
        const data = await axios.get(`${baseURL}/admin/courses`)
        console.log(data.data,"courses from database")
        setCourses(data.data)
        console.log(courses,"in courses")
      } catch (error) {
        console.error("Error fetching courses",error)
      }
    }
    fetchCategories();
    fetchCourses();
  }, []);

  const imageUpload = async(e)=>{
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

  const handleAddModule = async() => {
    // Handle adding module data here
    const formData = {
      moduleName,
      moduleDescription,
      moduleImage,
      videoUrls,
      tutorName,
      selectedCategory,
      selectedCourses,
      coursePrice
    }


   const response = await axios.post(`${baseURL}/tutor/add-module`,formData)
   console.log(response,"response from backend")


    // Reset input fields
    setModuleName('');
    setModuleDescription('');
    setModuleImage('');
    setCoursePrice("")
    setVideoUrls([]);
    setTutorName('');
    setIsModalOpen(false);

  };

  return (
    <div className="relative">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add Module
      </button>
      {/* Modal */}
      {isModalOpen && (
        <div className="flex inset-0 flex items-center justify-center">
          {/* <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={() => setIsModalOpen(false)}></div> */}
          <div className="modal-content  p-8 rounded-lg shadow-lg max-w-xl bg-gradient-to-r from-pink-500 to-teal-500 ">
            <button className="absolute top-0 right-0 m-4 text-xl" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Module</h2>
            <label className="block mb-2">Module Name:</label>
            <input
              type="text"
              value={moduleName}
              onChange={(e) => setModuleName(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">Module Description:</label>
            <textarea
              value={moduleDescription}
              onChange={(e) => setModuleDescription(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">Module Image:</label>
            <input
              type='file'
              accept="image/*"
              value={moduleImage}
              onChange={(e) => imageUpload(e)}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">Video URLs:</label>
            <input
              type="text"
              placeholder="Enter video URL"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setVideoUrls([...videoUrls, e.target.value]);
                  e.target.value = '';
                }
              }}
              className="w-full border rounded p-2 mb-4"
            />
            <ul>
              {videoUrls.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
            <label className="block mb-2">Tutor Name:</label>
            <input
              type="text"
              value={tutorName}
              onChange={(e) => setTutorName(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
             <label className="block mb-2">Course Price:</label>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="w-full border rounded p-2 mb-4"
            />
            <label className="block mb-2">Category:</label>
            <select
              value={selectedCategory.categoryName}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select category</option>
              {categories && categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <label className="block mb-2">Course:</label>
            <select
              value={selectedCourses.coursename}
              onChange={(e) => setSelectedCourses(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full"
            >
              <option value="">Select category</option>
              {courses && courses.map((course) => (
                <option key={course._id} value={course.coursename}>
                  {course.coursename}
                </option>
              ))}
            </select>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddModule}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleAdd;
