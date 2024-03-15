import React from 'react'

const Dashboard = () => {
  return (
    <div className="flex h-screen">
    {/* Left Menu */}
    <div className="border border-blue-300 bg-gradient-to-r from-teal-500 to-pink-500 text-blue-500 w-1/5 p-4">
      <div className="mb-4">
        <h1 className=" text-white mb-4 font-semibold">Dashboard</h1>
      </div>
      <ul>
        <li className="text-white mb-4 font-semibold">
          <a href="/users" className="hover:text-blue-500">
            Users
          </a>
        </li>
        <li className="text-white mb-4 font-semibold">
          <a href="/tutors" className="hover:text-blue-500">
            Tutors
          </a>
        </li>
        <li className="text-white mb-4 font-semibold">
          <a href="/courses" className="hover:text-blue-500">
            Courses
          </a>
        </li>
        <li className="text-white mb-4 font-semibold">
          <a href="/orders" className="hover:text-blue-500">
            Orders
          </a>
        </li>
        <li className="text-white mb-4 font-semibold">
          <a href="/banners" className="hover:text-blue-500">
            Banners
          </a>
        </li>
        <li  className="text-white mb-4 font-semibold">
          <a href="/logout" className="hover:text-red-500">
            Logout
          </a>
        </li>
      </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-8">
      {/* Your main content goes here */}
      <div>Welcome to Admin Dashboard</div>
    </div>
  </div>
  )
}

export default Dashboard