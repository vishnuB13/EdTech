// Services.js
import React from 'react';

const Services = () => {
  return (
    <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6">Our Services</h1>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Online Courses</h2>
          <p className="text-gray-700">
            Access a wide range of online courses taught by experienced
            instructors. Learn at your own pace and from the comfort of your
            home.
          </p>
        </div>
  
        {/* Service Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Interactive Learning</h2>
          <p className="text-gray-700">
            Engage in interactive learning experiences with live sessions,
            quizzes, and collaborative projects. Enhance your understanding of
            subjects through active participation.
          </p>
        </div>
  
        {/* Service Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Certification Programs</h2>
          <p className="text-gray-700">
            Earn industry-recognized certifications upon completion of our
            courses. Boost your resume and stand out in the job market.
          </p>
        </div>
  
        {/* Add more service cards as needed */}
      </div>
    </div>
  );
  
};

export default Services;
