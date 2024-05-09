import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import { useNavigate } from 'react-router-dom'
import CategoryAdd from './CategoryAdd'
import axios from 'axios'
import baseURL from '../../apiConfig'
import CategoryEditModal from './CategoryEditModal'
import { toast } from 'react-toastify'
import toastoptions from '../../toastConfig'


const AdminCategory = () => {

  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [listed, setListed] = useState(true)
  const [categoryEditModal, setCategoryEditModal] = useState(false)
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/admin/category`)
        console.log(response, "response in home")
        setCategories(response.data)
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };
    fetchCategoryDetails()
  }, [])

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditModal(true);
  };

  const saveChanges = async(categoryId, updatedCategory) => { 
    // Update category in the database
    // Close modal
   let response = await axios.put(`${baseURL}/admin/category`,{categoryId,updatedCategory})
   if(response.data.message==='Successfully edited'){
    toast.success(response.data.message,toastoptions)
    window.location.href='/admin/category-management'
   }else{
    toast.error(response.data.message,toastoptions)
   }
  };

  const closeModal = () => {
    setEditModal(false);
    navigate('/admin/category-management')
  };
  const handleUnlist = async(category) => {
    try {
      const updatedCategory = {
        categoryId: category._id,
        isListed: !category.isListed // Toggle isListed for the specific category
      };
      const response = await axios.patch(`${baseURL}/admin/category`, updatedCategory);
      if (response.data.message === 'Successfully Listed' || response.data.message === 'Successfully Unlisted') {
        toast.success(response.data.message, toastoptions);
        window.location.href='/admin/category-management'
      } else {
        toast.error(response.data.message, toastoptions);
      }
    } catch (error) {
      console.error('Error updating category list status:', error.message);
    }
  };
  



  return (
    <div className="flex h-screen">
      <SideBar />
      {openModal && <CategoryAdd isOpen={openModal} closeModal={() => setOpenModal(false)} />}

      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{category.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{category._id}</td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  <span className="bg-pink-100 px-2 py-1 rounded-md">{category.categoryDescription}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                  <button onClick={() => handleEdit(category)} className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Edit
                  </button>
                  {category.isListed ?(<button onClick={() => handleUnlist(category)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Unlist
                  </button>):(<button onClick={() => handleUnlist(category)} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                   List
                  </button>)}
                </td>
                {/* Render other course details here */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     <div>
     <CategoryEditModal
        category={selectedCategory}
        isOpen={editModal}
        closeModal={closeModal}
        saveChanges={saveChanges}
      />
     </div>
   


      <div className='flex-grow flex justify-center items-center'>
        <div className='absolute top-12 right-0  mt-18'>
          <button
            onClick={(e) => {
              e.preventDefault()
              setOpenModal(true)
            }}
            type="button"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            ADD CATEGORY
          </button>
        </div>
      </div>
    </div>

  )
}

export default AdminCategory