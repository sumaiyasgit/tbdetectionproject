import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center text-white font-bold">TB</div>
          <span className="text-xl font-semibold">TB Care</span>
        </Link>

        <nav className="flex gap-3 items-center">
          <NavLink to="/" className={({isActive}) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-700'}>Home</NavLink>
          <NavLink to="/upload" className={({isActive}) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-700'}>Upload X-ray</NavLink>
          <NavLink to="/learn" className={({isActive}) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-700'}>Learn</NavLink>
          <Link to="/upload" className="ml-4 bg-indigo-600 text-white px-3 py-1.5 rounded shadow-sm hover:bg-indigo-700">Start</Link>
        </nav>
      </div>
    </header>
  );
}
