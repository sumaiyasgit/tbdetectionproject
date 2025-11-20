import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">TB Care — Pediatric X-ray Screening</h1>
      <p className="text-gray-700 mb-6">Upload a chest X-ray image and get a quick AI-assisted check for signs of tuberculosis in children. Also find easy-to-understand educational content about TB — causes, signs, and how to protect your child.</p>

      <div className="flex justify-center gap-4">
        <Link to="/upload" className="bg-indigo-600 text-white px-5 py-3 rounded shadow">Upload X-ray</Link>
        <Link to="/learn" className="px-5 py-3 border rounded">Learn about TB</Link>
      </div>

      <section className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-medium mb-3">Why early detection matters</h2>
        <p className="text-gray-600">Children can show different signs of TB than adults. Early awareness and screening help start the right care sooner.</p>
      </section>
    </div>
  );
}

