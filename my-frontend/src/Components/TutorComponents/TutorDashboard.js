import React from 'react';

const TutorDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Left Menu */}
      <div className="bg-gray-800 text-white w-1/5 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">Tutor Dashboard</h1>
          <p>Welcome, Tutor!</p>
        </div>
        <ul>
          <li className="mb-2">
            <a href="/users" className="hover:text-blue-500">
              Users
            </a>
          </li>
          <li className="mb-2">
            <a href="/tutors" className="hover:text-blue-500">
              Tutors
            </a>
          </li>
          <li className="mb-2">
            <a href="/courses" className="hover:text-blue-500">
              Courses
            </a>
          </li>
          <li className="mb-2">
            <a href="/orders" className="hover:text-blue-500">
              Orders
            </a>
          </li>
          <li className="mb-2">
            <a href="/banners" className="hover:text-blue-500">
              Banners
            </a>
          </li>
          <li>
            <a href="/logout" className="hover:text-red-500">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Your main content goes here */}
        <div>Welcome to Tutor Dashboard</div>
      </div>
    </div>
  );
};

export default TutorDashboard;
