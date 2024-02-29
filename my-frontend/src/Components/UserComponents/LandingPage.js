// LandingPage.js

import React from 'react';
import firstFrame from '../../images/firstFrame.jpg';

const LandingPage = () => {
  const courses = [
    {
      _id: 1,
      title: 'Course 1',
      image: 'course1.jpg', // Replace with actual image URL
      description: 'Description for Course 1',
    },
    {
      _id: 2,
      title: 'Course 2',
      image: 'course2.jpg', // Replace with actual image URL
      description: 'Description for Course 2',
    },
    {
      _id: 3,
      title: 'Course 3',
      image: 'course3.jpg', // Replace with actual image URL
      description: 'Description for Course 3',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-teal-500 to-pink-500 min-h-screen flex flex-col">
      {/* Header Section */}

      <header className="bg-gradient-to-r from-teal-500 to-pink-500 text-white text-center py-10 flex flex-col md:flex-row items-center justify-between">
    {/* Left side: Text components */}
    <div className="text-left pr-4 md:pr-8 md:w-1/2 md:pl-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your E-Learning Platform</h1>
      <p className="text-lg mb-6">Learn at your own pace with our high-quality courses.</p>
    </div>

    {/* Right side: Responsive round image */}
    <div className="md:w-1/2 flex items-center justify-center">
      <img
        src={firstFrame}
        alt="Your Alt Text"
        className="max-w-full h-auto md:max-w-md object-contain rounded-full"
      />
    </div>
  </header>



      {/* Featured Courses Section */}
      <section className="bg-gray-200 py-10 flex-1">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-white p-6 rounded-md shadow-md mb-4">
                <img src={course.image} alt={course.title} className="mb-4 rounded-md" />
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600">{course.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-pink-500 to-teal-500 text-white text-center py-6">
        <p>Contact us at Edtech@gmail.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
