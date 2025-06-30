import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { useNotification } from '../../context/NotificationContext'

const emptyTask = {
  taskTitle: '',
  taskDescription: '',
  taskDate: '',
  category: '',
  active: true,
  newTask: true,
  completed: false,
  failed: false,
};

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyTask);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [editIdx, setEditIdx] = useState({ empIdx: null, taskIdx: null });
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAssign = (empIdx) => {
    setForm(emptyTask);
    setSelectedEmp(empIdx);
    setEditIdx({ empIdx: null, taskIdx: null });
    setShowForm(true);
  };

  const handleEdit = (empIdx, taskIdx) => {
    setForm({ ...userData[empIdx].tasks[taskIdx] });
    setSelectedEmp(empIdx);
    setEditIdx({ empIdx, taskIdx });
    setShowForm(true);
  };

  const handleDelete = (empIdx, taskIdx) => {
    if (window.confirm('Delete this task?')) {
      const updated = [...userData];
      updated[empIdx].tasks.splice(taskIdx, 1);
      // Update taskCounts
      updateTaskCounts(updated[empIdx]);
      setUserData(updated);
      localStorage.setItem('employees', JSON.stringify(updated));
      showNotification('Task deleted.', 'error');
    }
  };

  const updateTaskCounts = (employee) => {
    const counts = { active: 0, newTask: 0, completed: 0, failed: 0 };
    employee.tasks.forEach((t) => {
      if (t.active) counts.active++;
      if (t.newTask) counts.newTask++;
      if (t.completed) counts.completed++;
      if (t.failed) counts.failed++;
    });
    employee.taskCounts = counts;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = [...userData];
    if (editIdx.empIdx !== null && editIdx.taskIdx !== null) {
      // Edit
      updated[editIdx.empIdx].tasks[editIdx.taskIdx] = { ...form };
      updateTaskCounts(updated[editIdx.empIdx]);
      showNotification('Task updated.', 'success');
    } else if (selectedEmp !== null) {
      // Assign new
      updated[selectedEmp].tasks.push({ ...form });
      updateTaskCounts(updated[selectedEmp]);
      showNotification('Task assigned.', 'success');
    }
    setUserData(updated);
    localStorage.setItem('employees', JSON.stringify(updated));
    setShowForm(false);
    setForm(emptyTask);
    setSelectedEmp(null);
    setEditIdx({ empIdx: null, taskIdx: null });
  };

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <h2 className='text-3xl font-extrabold text-blue-400 drop-shadow mb-6'>All Employee Tasks</h2>
      {userData.map((emp, empIdx) => (
        <div key={emp.id} className='mb-8 bg-gray-800 rounded p-4'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-lg font-semibold text-white'>{emp.firstName}</h3>
            <button className='bg-blue-600 text-white px-3 py-1 rounded shadow font-semibold hover:bg-blue-700 focus:bg-blue-800 active:bg-blue-900 transition-colors' onClick={() => handleAssign(empIdx)}>Assign Task</button>
          </div>
          <div className='overflow-x-auto w-full'>
            <table className='min-w-[600px] bg-white rounded shadow text-black'>
              <thead>
                <tr>
                  <th className='py-2 px-4 border-b bg-gray-100 font-bold text-black'>Title</th>
                  <th className='py-2 px-4 border-b bg-gray-100 font-bold text-black'>Description</th>
                  <th className='py-2 px-4 border-b bg-gray-100 font-bold text-black'>Date</th>
                  <th className='py-2 px-4 border-b bg-gray-100 font-bold text-black'>Category</th>
                  <th className='py-2 px-4 border-b bg-gray-100 font-bold text-black'>Status</th>
                  <th className='py-2 px-4 border-b bg-gray-100 font-bold text-black'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {emp.tasks && emp.tasks.length > 0 ? emp.tasks.map((task, taskIdx) => (
                  <tr key={taskIdx} className='hover:bg-gray-100'>
                    <td className='py-2 px-4 border-b text-black'>{task.taskTitle}</td>
                    <td className='py-2 px-4 border-b text-black'>{task.taskDescription}</td>
                    <td className='py-2 px-4 border-b text-black'>{task.taskDate}</td>
                    <td className='py-2 px-4 border-b text-black'>{task.category}</td>
                    <td className='py-2 px-4 border-b text-black'>
                      {task.completed ? 'Completed' : task.failed ? 'Failed' : task.active ? 'Active' : task.newTask ? 'New' : '—'}
                    </td>
                    <td className='py-2 px-4 border-b text-black'>
                      <button className='text-blue-600 mr-3' onClick={() => handleEdit(empIdx, taskIdx)}>Edit</button>
                      <button className='text-red-600' onClick={() => handleDelete(empIdx, taskIdx)}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan='6' className='text-center py-4 text-black'>No tasks assigned.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      {showForm && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-30'>
          <form className='bg-white p-8 rounded shadow max-w-lg w-full' onSubmit={handleSubmit}>
            <h3 className='text-xl font-bold mb-4 text-black'>{editIdx.empIdx !== null ? 'Edit Task' : 'Assign Task'}</h3>
            <div className='mb-4'>
              <label className='block mb-1 text-black'>Title</label>
              <input type='text' name='taskTitle' value={form.taskTitle} onChange={handleChange} required className='w-full border px-3 py-2 rounded text-black' />
            </div>
            <div className='mb-4'>
              <label className='block mb-1 text-black'>Description</label>
              <input type='text' name='taskDescription' value={form.taskDescription} onChange={handleChange} required className='w-full border px-3 py-2 rounded text-black' />
            </div>
            <div className='mb-4'>
              <label className='block mb-1 text-black'>Date</label>
              <input type='date' name='taskDate' value={form.taskDate} onChange={handleChange} required className='w-full border px-3 py-2 rounded text-black' />
            </div>
            <div className='mb-4'>
              <label className='block mb-1 text-black'>Category</label>
              <input type='text' name='category' value={form.category} onChange={handleChange} required className='w-full border px-3 py-2 rounded text-black' />
            </div>
            <div className='flex gap-4 mt-6'>
              <button type='submit' className='bg-green-600 text-white px-4 py-2 rounded'>Save</button>
              <button type='button' className='bg-gray-400 text-white px-4 py-2 rounded' onClick={() => { setShowForm(false); setForm(emptyTask); setSelectedEmp(null); setEditIdx({ empIdx: null, taskIdx: null }); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AllTask