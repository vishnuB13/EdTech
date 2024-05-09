// CategoryEditModal.jsx
import React, { useEffect, useState } from 'react';

const CategoryEditModal = ({ category, isOpen, closeModal, saveChanges }) => {
    console.log(category,"in edit modal")
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState(''); 

  useEffect(()=>{
setCategoryName(category.categoryName)
setCategoryDescription(category.categoryDescription)
  },[category.categoryName,category.categoryDescription])
 

  const handleSaveChanges = () => {
    // Call saveChanges function with updated category details
    saveChanges(category._id, { categoryName, categoryDescription });
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Edit Category</h3>
                  <div className="mt-2">
  <div className="mb-4"> 
    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">
      Category Name
    </label>
    <input
      type="text"
      name="categoryName"
      id="categoryName"
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
      className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700">
      Category Description
    </label>
    <textarea
      name="categoryDescription"
      id="categoryDescription"
      value={categoryDescription}
      onChange={(e) => setCategoryDescription(e.target.value)}
      className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    ></textarea>
  </div>
</div>

                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSaveChanges}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save Changes
              </button>
              <button
                onClick={closeModal}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CategoryEditModal;

