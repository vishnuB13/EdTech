import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import baseURL from '../../apiConfig';

axios.defaults.withCredentials = true
let accesstoken = Cookies.get('accesstoken')
console.log(accesstoken, "access token in home")
const data = { accesstoken: accesstoken }

const Home = ({ name }) => {
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])

  console.log(name, "name in home")
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/categories`)
        console.log(response, "response in home")
        setCategories(response.data)

      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/courses`)
        console.log(response, "response in home")
        setCourses(response.data)

      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchCategoryDetails()
    fetchCourseDetails()
  }, [])
  return (
    <div >
      {/* Featured Courses Section */}

      <nav className="bg-gradient-to-r from-pink-500 to-teal-500 ">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0">
                <h2 className="text-2xl text-white font-bold">Categories</h2>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {categories.map((category) => (
                    <div key={category._id} className="relative">
                      <button
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      // onMouseEnter={() => handleHover(category._id)} // Handle hover event
                      >
                        {category.categoryName}
                      </button>                    
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {categories != [] && <section className="bg-gray-200 py-10 flex-1">
        <div className="container mx-auto">
          <h2 className="text-2xl text-blue-500 font-bold mb-6">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category._id} className="bg-white p-6 rounded-md shadow-md mb-4">
                <img src={category.categoryImage} alt={category.title} className="mb-4 rounded-md h-60 w-full object-cover" />
                {/* Adjust the height (h-40) as needed */}
                <h3 className="text-xl text-blue-500 font-semibold mb-2">{category.categoryName}</h3>
                <p className="text-gray-600">{category.categoryDescription}</p>
              </div>
            ))}
          </div>

        </div>
      </section>}
      {courses != [] && <section className="bg-gray-200 py-10 flex-1">
        <div className="container mx-auto">
          <h2 className="text-2xl text-blue-500 font-bold mb-6">Courses We Provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-white p-6  rounded-md shadow-md mb-4">
                <img src={course.courseImage} alt={course.title} className="mb-4  rounded-md" />
                <h3 className="text-xl text-blue-500 font-semibold mb-2">{course.coursename}</h3>
                <p className="text-gray-600">{course.courseDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>}
    </div>

  )
}

export default Home