// TeamMembers.jsx
import React from 'react';

function TeamMembers() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Team member cards go here */}
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-gray-600">Software Developer</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Jane Smith</h3>
          <p className="text-gray-600">UI/UX Designer</p>
        </div>
      </div>
    </div>
  );
}

export default TeamMembers;
