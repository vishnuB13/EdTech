// LandingPage.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


import axios from 'axios';
import baseURL from '../../apiConfig';
import { useState, useEffect } from 'react';
import firstFrame from '../../images/firstFrame.jpg';
import Footer from './Footer';

const LandingPage = () => {
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
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

  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-700 hover:text-black"
        onClick={onClick}
      >
        <FaChevronLeft size={24} />
      </button>
    );
  };

  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-700 hover:text-black"
        onClick={onClick}
      >
        <FaChevronRight size={24} />
      </button>
    );
  };

  return (
    <div className=" min-h-screen  p-10   flex flex-col">
      {/* Header Section */}

      <header className="bg-gradient-to-r from-teal-300 to-yellow-200 shadow border text-black text-center py-10 flex flex-col md:flex-row items-center justify-between">
        {/* Left side: Text components */}
        <div className="text-left  pr-4 md:pr-8 md:w-1/2 pd-10 md:pl-8 border  ml-2 p-20">

          <h1 className="text-4xl text-center text-black font-bold mb-4">Welcome to Your </h1>
          <h2 className="text-4xl text-black text-center font-bold mb-4">E-Learning Platform</h2>
          <p className="text-lg mb-6 text-center text-semibold text-white">Learn at your own pace with our high-quality courses.</p>

        </div>

        {/* Right side: Responsive round image */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={firstFrame}
            alt="Your Alt Text"
            className="max-w-full rounded h-auto md:max-w-md object-contain "
          />
        </div>
      </header>



      {/* Featured Categories Section */}
      <section className=" py-10 flex-1">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category._id} className="bg-gray-200 border p-6 rounded-md border shadow-md mb-4">
                <img
                  src={category.categoryImage}
                  alt={category.title}
                  className="mb-4 rounded-md"
                  style={{ width: '100%', height: '200px' }} // Set a fixed height and width
                />
                <h3 className="text-xl text-black text-center font-bold mb-2">{category.categoryName}</h3>
                <p className="text-black font-semibold text-center">{category.categoryDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Featured Courses Section */}

      <section className="py-10 flex-1">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
          <Slider
            dots={true} // Show dots for navigation
            infinite={true} // Infinite loop
            speed={500} // Transition speed in milliseconds
            slidesToShow={3} // Number of slides to show at once
            slidesToScroll={1} // Number of slides to scroll
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {courses.map((course) => (
              <div key={course._id} className="bg-teal-200 border-black border-1 shadow-5 p-6 rounded-md border shadow-md mb-4">
                <img
                  src={course.courseImage}
                  alt={course.coursename}
                  className="mb-4 border-black border-2 rounded-md"
                  style={{ width: '100%', height: '200px' }} // Set a fixed height and width
                />
                <h3 className="text-xl text-black text-center font-bold mb-2">{course.coursename}</h3>
                <p className="text-black font-semibold text-center">{course.courseDescription}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>


      {/* Footer Section */}
      <Footer ></Footer>
    </div>
  );
};

export default LandingPage;
