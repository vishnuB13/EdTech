import React from 'react'
import CourseAdd from './CourseAdd'
import SideBar from './SideBar'
import { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import baseURL from '../../apiConfig.js'

const AdminCourse = () => {
    const navigate = useNavigate()
    const [openModal,setOpenModal]=useState(false)
    const [courses, setCourses] = useState([])
    useEffect(()=>{
      const fetchCourseDetails = async () => {
          try {
            const response = await axios.get(`${baseURL}/admin/courses`)
            console.log(response,"response in home")
            setCourses(response.data)
           
          } catch (error) {
            console.error('Error fetching user details:', error.message);
          }
        };
        fetchCourseDetails()
  },[]) 

  return (
    <div className="flex h-screen">
    <SideBar />
    {openModal &&  <CourseAdd isOpen={openModal} closeModal={() => setOpenModal(false)}/> }

    <div className="mt-8">
  <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          #
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Course Name
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Course ID
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Course Description
        </th>
        {/* Add more table headers as needed */}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {courses.map((course, index) => (
        <tr key={course._id}>
          <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
          <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{course.courseName}</td>
          <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{course._id}</td>
          <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
            <span className="bg-pink-100 px-2 py-1 rounded-md">{course.courseDescription}</span>
          </td>
          {/* Render other course details here */}
        </tr>
      ))}
    </tbody>
  </table>
</div>

   
    <div className='flex-grow flex justify-center items-center'>
      <div className='absolute top-12 right-0  mt-18'>
        <button
          onClick={(e)=>{ 
            e.preventDefault()
            setOpenModal(true)}}
          type="button"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          ADD COURSE
        </button>
      </div>
    </div>
  </div>
  
  )
}

export default AdminCourse