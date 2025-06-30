import React from 'react'

const TaskListNumbers = ({ data }) => {
  if (!data || !data.taskCounts) return null; // ✅ prevent crash

  return (
    <div className='flex flex-col sm:flex-row mt-10 justify-between gap-5 w-full'>
      <div className='rounded-xl w-full sm:w-[22%] py-6 px-9 bg-blue-400 mb-3 sm:mb-0'>
        <h2 className='text-3xl font-bold'>{data.taskCounts.newTask}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>New Task</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[22%] py-6 px-9 bg-green-400 mb-3 sm:mb-0'>
        <h2 className='text-3xl font-bold'>{data.taskCounts.completed}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Completed Task</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[22%] py-6 px-9 bg-yellow-400 mb-3 sm:mb-0'>
        <h2 className='text-3xl text-black font-bold'>{data.taskCounts.active}</h2>
        <h3 className='text-xl mt-0.5 text-black font-medium'>Accepted Task</h3>
      </div>
      <div className='rounded-xl w-full sm:w-[22%] py-6 px-9 bg-red-400'>
        <h2 className='text-3xl font-bold'>{data.taskCounts.failed}</h2>
        <h3 className='text-xl mt-0.5 font-medium'>Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumbers
