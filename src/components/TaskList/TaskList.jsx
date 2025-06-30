import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data, onAccept, onComplete, onFail }) => {
  if (!data || !data.tasks) return null; // Prevent crash if data not ready

  return (
    <div
      id='tasklist'
      className='flex flex-col sm:flex-row items-center justify-start gap-5 w-full py-1 mt-8'
    >
      {data.tasks.map((elem, idx) => {
        if (elem.active) {
          return <AcceptTask key={idx} data={elem} onComplete={() => onComplete && onComplete(idx)} onFail={() => onFail && onFail(idx)} />;
        }
        if (elem.newTask) {
          return <NewTask key={idx} data={elem} onAccept={() => onAccept && onAccept(idx)} />;
        }
        if (elem.completed) {
          return <CompleteTask key={idx} data={elem} />;
        }
        if (elem.failed) {
          return <FailedTask key={idx} data={elem} />;
        }
        return null; // Add fallback in case none match
      })}
    </div>
  );
};

export default TaskList;
