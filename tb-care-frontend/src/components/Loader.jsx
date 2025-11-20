import React from 'react';

export default function Loader({ message = 'Processing...' }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
      <div className="text-gray-600">{message}</div>
    </div>
  );
}
