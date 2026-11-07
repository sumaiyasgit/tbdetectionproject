import React from 'react';
import { Link } from 'react-router-dom';

export default function Results() {
  const raw = sessionStorage.getItem('tb_result');
  const result = raw ? JSON.parse(raw) : null;

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-2">No results yet</h2>
        <p className="text-gray-600 mb-4">Upload an X-ray to get analysis.</p>
        <Link to="/upload" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Go to Upload
        </Link>
      </div>
    );
  }

  const label = result.label ?? "No label returned";

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

      {/* Only TB / No TB result */}
      <h2 className="text-3xl font-semibold text-center mb-6">
        {label}
      </h2>

      {/* Buttons */}
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/learn" className="px-4 py-2 border rounded">
          Learn about TB
        </Link>
        <Link to="/upload" className="px-4 py-2 bg-indigo-600 text-white rounded">
          Analyze another
        </Link>
      </div>
    </div>
  );
}
