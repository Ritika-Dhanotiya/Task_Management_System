import React, { useState } from 'react';

const MobileNavbar = ({ role, onNavigate }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-900 text-white flex items-center justify-between px-4 py-3 md:hidden shadow z-40 fixed top-0 left-0">
      <div className="text-xl font-extrabold text-blue-400">EMS</div>
      <button
        className="text-white text-2xl focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-gray-900 shadow-lg flex flex-col items-start py-2 z-50 animate-fadeIn">
          {role === 'admin' ? (
            <>
              <button className="w-full text-left px-6 py-2 hover:bg-blue-700 font-semibold" onClick={() => { onNavigate('dashboard'); setOpen(false); }}>Dashboard</button>
              <button className="w-full text-left px-6 py-2 hover:bg-blue-700 font-semibold" onClick={() => { onNavigate('employees'); setOpen(false); }}>Manage Employees</button>
              <button className="w-full text-left px-6 py-2 hover:bg-blue-700 font-semibold" onClick={() => { onNavigate('tasks'); setOpen(false); }}>All Tasks</button>
            </>
          ) : (
            <>
              <button className="w-full text-left px-6 py-2 hover:bg-blue-700 font-semibold" onClick={() => { onNavigate('dashboard'); setOpen(false); }}>Dashboard</button>
              <button className="w-full text-left px-6 py-2 hover:bg-blue-700 font-semibold" onClick={() => { onNavigate('profile'); setOpen(false); }}>My Profile</button>
              <button className="w-full text-left px-6 py-2 hover:bg-blue-700 font-semibold" onClick={() => { onNavigate('tasks'); setOpen(false); }}>My Tasks</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar; 