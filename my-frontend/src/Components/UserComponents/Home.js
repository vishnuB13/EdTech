import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials=true
let accesstoken = Cookies.get('accesstoken')
console.log(accesstoken,"access token in home")
const data={accesstoken:accesstoken}

const Home = ({name}) => {

  console.log(name,"name in home")
    // useEffect(()=>{
    //     const fetchUserDetails = async () => {
    //         try {
    //           const response = await axios.post('http://localhost:7000/user/details',data,{
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${accesstoken}`
    //             },
    //           })
    //           console.log(response,"response in home")
    //           let nama = response.data.user.name
    //           console.log(nama,"nameee")
    //           setName(nama)
    //         } catch (error) {
    //           console.error('Error fetching user details:', error.message);
    //         }
    //       };
    //       fetchUserDetails()
    // },[])
// Example function to fetch user details
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
    
    <div className='bg-gradient-to-r from-teal-500 to-pink-500 text-center'>
    <h1 className='text-white font-bold'>HOME PAGE</h1>
    <h1 className='text-white'>Welcome {name}</h1>
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
    </div>
   
  )
}

export default Home