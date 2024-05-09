import React from 'react'

const SideBar = () => {
  return (
    <div className="border border-blue-300 bg-gradient-to-r from-teal-500 to-pink-500 text-blue-500 w-1/5 p-4">
      <div className="mb-4">
        <h1 className=" text-white mb-4 font-semibold">Dashboard</h1>
      </div>
      <ul>
        <li className="text-white mb-4 font-semibold">
          <a href="/admin/user-management" className="hover:text-blue-500">
            Users
          </a>
        </li>
        <li className="text-white mb-4 font-semibold">
          <a href="/tutors" className="hover:text-blue-500">
            Tutors
          </a>
        </li>
        <li className="text-white mb-4 font-semibold">
          <a href="/admin/category-management" className="hover:text-blue-500">
            Categories
          </a>
        </li>
        <li className="text-white mb-4 font-semibold">
          <a href="/admin/course-management" className="hover:text-blue-500">
            Courses
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
  )
}

export default SideBar