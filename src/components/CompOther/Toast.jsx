import React from 'react';
import { useNotification } from '../../context/NotificationContext';

const Toast = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`px-4 py-2 rounded shadow text-white ${
            n.type === 'success' ? 'bg-green-600' : n.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Toast; 