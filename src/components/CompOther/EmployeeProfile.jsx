import React, { useState } from 'react';

const EmployeeProfile = ({ data, onSave }) => {
  const [form, setForm] = useState({
    firstName: data?.firstName || '',
    email: data?.email || '',
    password: data?.password || '',
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
    if (onSave) onSave(form);
  };

  return (
    <div className="w-full px-2 sm:px-0 flex flex-col items-center mt-6 sm:mt-10">
      <div className="w-full max-w-sm bg-white border-2 border-red-500 rounded-lg shadow p-4 sm:p-6 flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl font-extrabold text-red-500 drop-shadow mb-4 text-center w-full">My Profile</h2>
        <div className="space-y-3 w-full">
          <div>
            <label className="block text-red-700 font-semibold mb-1 text-xs sm:text-sm">Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              disabled={!editing}
              className="w-full px-2 py-1 border-2 border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400 mt-1 text-red-800 bg-white text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-red-700 font-semibold mb-1 text-xs sm:text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              className="w-full px-2 py-1 border-2 border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400 mt-1 text-red-800 bg-white text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-red-700 font-semibold mb-1 text-xs sm:text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={!editing}
              className="w-full px-2 py-1 border-2 border-red-300 rounded focus:outline-none focus:ring-2 focus:ring-red-400 mt-1 text-red-800 bg-white text-xs sm:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-6 w-full items-center justify-center">
          {!editing ? (
            <button
              className="bg-red-500 text-white w-full sm:w-auto px-3 py-1.5 rounded shadow font-semibold hover:bg-red-600 focus:bg-red-700 active:bg-red-800 transition-colors text-sm sm:text-base"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          ) : (
            <button
              className="bg-green-600 text-white w-full sm:w-auto px-3 py-1.5 rounded shadow font-semibold hover:bg-green-700 focus:bg-green-800 active:bg-green-900 transition-colors text-sm sm:text-base"
              onClick={handleSave}
            >
              Save
            </button>
          )}
          {editing && (
            <button
              className="bg-gray-400 text-white w-full sm:w-auto px-3 py-1.5 rounded shadow font-semibold hover:bg-gray-500 focus:bg-gray-600 active:bg-gray-700 transition-colors text-sm sm:text-base"
              onClick={() => { setEditing(false); setForm({ firstName: data?.firstName || '', email: data?.email || '', password: data?.password || '' }); }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile; 