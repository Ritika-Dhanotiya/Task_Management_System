import React, { useState } from 'react'
import Header from '../CompOther/header'
import TaskListNumbers from '../CompOther/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import Sidebar from '../CompOther/Sidebar'
import EmployeeProfile from '../CompOther/EmployeeProfile'
import { useNotification } from '../../context/NotificationContext'
import MobileNavbar from '../CompOther/MobileNavbar'

const EmployeeDashboard = (props) => {
  const [page, setPage] = useState('dashboard');
  const [profile, setProfile] = useState(props.data);
  const { showNotification } = useNotification();

  const updateTaskCounts = (tasks) => {
    const counts = { active: 0, newTask: 0, completed: 0, failed: 0 };
    tasks.forEach((t) => {
      if (t.active) counts.active++;
      if (t.newTask) counts.newTask++;
      if (t.completed) counts.completed++;
      if (t.failed) counts.failed++;
    });
    return counts;
  };

  const updateProfileTasks = (tasks) => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const idx = employees.findIndex(e => e.id === profile.id);
    if (idx !== -1) {
      employees[idx] = { ...employees[idx], tasks, taskCounts: updateTaskCounts(tasks) };
      localStorage.setItem('employees', JSON.stringify(employees));
      setProfile(employees[idx]);
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employees[idx] }));
    }
  };

  const handleAcceptTask = (taskIdx) => {
    const tasks = profile.tasks.map((t, i) => i === taskIdx ? { ...t, newTask: false, active: true } : t);
    updateProfileTasks(tasks);
    showNotification('Task accepted!', 'success');
  };

  const handleCompleteTask = (taskIdx) => {
    const tasks = profile.tasks.map((t, i) => i === taskIdx ? { ...t, active: false, completed: true, newTask: false, failed: false } : t);
    updateProfileTasks(tasks);
    showNotification('Task marked as completed!', 'success');
  };

  const handleFailTask = (taskIdx) => {
    const tasks = profile.tasks.map((t, i) => i === taskIdx ? { ...t, active: false, failed: true, completed: false, newTask: false } : t);
    updateProfileTasks(tasks);
    showNotification('Task marked as failed.', 'error');
  };

  const handleProfileSave = (updated) => {
    // Update localStorage
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const idx = employees.findIndex(e => e.id === profile.id);
    if (idx !== -1) {
      employees[idx] = { ...employees[idx], ...updated };
      localStorage.setItem('employees', JSON.stringify(employees));
      setProfile(employees[idx]);
      // Also update loggedInUser
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employees[idx] }));
    }
  };

  return (
    <div className='flex flex-col min-h-screen w-full'>
      <MobileNavbar role='employee' onNavigate={setPage} />
      <div className='flex w-full flex-1'>
        <Sidebar role='employee' onNavigate={setPage} />
        <div className='flex-1 p-4 sm:p-10 md:ml-64 mt-14 md:mt-0 bg-[#1C1C1C]'>
          <Header changeUser={props.changeUser} data={profile}/>
          {page === 'dashboard' && <TaskListNumbers data={profile} />}
          {page === 'tasks' && <TaskList data={profile} onAccept={handleAcceptTask} onComplete={handleCompleteTask} onFail={handleFailTask} />}
          {page === 'profile' && <EmployeeProfile data={profile} onSave={handleProfileSave} />}
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard