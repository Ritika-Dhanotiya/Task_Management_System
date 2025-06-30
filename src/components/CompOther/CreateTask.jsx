import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [asignTo, setAsignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const newTaskObj = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: false,
      newTask: true,
      failed: false,
      completed: false
    };

    const updatedData = userData.map((elem) => {
      if (asignTo === elem.firstName) {
        return {
          ...elem,
          tasks: [...elem.tasks, newTaskObj],
          taskCounts: {
            ...elem.taskCounts,
            newTask: elem.taskCounts.newTask + 1
          }
        };
      }
      return elem;
    });

    setUserData(updatedData);

    // Clear form
    setTaskTitle('');
    setCategory('');
    setAsignTo('');
    setTaskDate('');
    setTaskDescription('');
  };

  return (
    <div className='p-3 sm:p-5 bg-[#1c1c1c] mt-5 rounded flex justify-center'>
      <form onSubmit={submitHandler} className='w-full max-w-2xl px-2 flex flex-col sm:flex-row gap-3'>
        <div className='w-full sm:w-1/2 flex flex-col gap-3'>
          <div>
            <h3 className='text-sm text-gray-300 mb-1'>Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className='text-sm py-2 px-3 w-full rounded outline-none bg-transparent border border-gray-400 mb-1 text-white'
              type='text'
              placeholder='Make a UI design'
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-1'>Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className='text-sm py-2 px-3 w-full rounded outline-none bg-transparent border border-gray-400 mb-1 text-white'
              type='date'
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-1'>Asign to</h3>
            <input
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className='text-sm py-2 px-3 w-full rounded outline-none bg-transparent border border-gray-400 mb-1 text-white'
              type='text'
              placeholder='employee name'
            />
          </div>
          <div>
            <h3 className='text-sm text-gray-300 mb-1'>Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='text-sm py-2 px-3 w-full rounded outline-none bg-transparent border border-gray-400 mb-1 text-white'
              type='text'
              placeholder='design, dev, etc'
            />
          </div>
          {/* On mobile, show description and button below all fields */}
          <div className='block sm:hidden'>
            <h3 className='text-sm text-gray-300 mb-1'>Description</h3>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className='w-full h-32 text-sm py-2 px-3 rounded outline-none bg-transparent border border-gray-400 text-white'
            ></textarea>
            <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-2 w-full font-semibold'>
              Create Task
            </button>
          </div>
        </div>
        {/* On desktop, show description and button in right column */}
        <div className='hidden sm:flex flex-col items-start w-2/5'>
          <h3 className='text-sm text-gray-300 mb-1'>Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className='w-full h-32 text-sm py-2 px-3 rounded outline-none bg-transparent border border-gray-400 text-white'
          ></textarea>
          <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full font-semibold'>
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
