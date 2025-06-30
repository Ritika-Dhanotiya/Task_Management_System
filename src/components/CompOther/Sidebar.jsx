import React from 'react';

const Sidebar = ({ role, onNavigate }) => {
  // Sidebar content as a function for reuse
  const sidebarContent = (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="text-3xl font-extrabold mb-10 tracking-wide text-blue-400 drop-shadow-lg flex items-center justify-between">
        EMS
      </div>
      <nav className="flex flex-col gap-4">
        {role === 'admin' ? (
          <>
            <button className="text-left hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 rounded px-3 py-2 transition-colors font-semibold tracking-wide" onClick={() => onNavigate('dashboard')}>Dashboard</button>
            <button className="text-left hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 rounded px-3 py-2 transition-colors font-semibold tracking-wide" onClick={() => onNavigate('employees')}>Manage Employees</button>
            <button className="text-left hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 rounded px-3 py-2 transition-colors font-semibold tracking-wide" onClick={() => onNavigate('tasks')}>All Tasks</button>
          </>
        ) : (
          <>
            <button className="text-left hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 rounded px-3 py-2 transition-colors font-semibold tracking-wide" onClick={() => onNavigate('dashboard')}>Dashboard</button>
            <button className="text-left hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 rounded px-3 py-2 transition-colors font-semibold tracking-wide" onClick={() => onNavigate('profile')}>My Profile</button>
            <button className="text-left hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 rounded px-3 py-2 transition-colors font-semibold tracking-wide" onClick={() => onNavigate('tasks')}>My Tasks</button>
          </>
        )}
      </nav>
    </div>
  );

  return (
    // Only show sidebar on md and up
    <aside className="bg-gray-900 text-white w-64 min-h-screen fixed top-0 left-0 z-30 shadow-lg border-r border-gray-800 hidden md:flex flex-col">
      {sidebarContent}
    </aside>
  );
};

export default Sidebar; 