import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <div>© {new Date().getFullYear()} TB Care</div>
          <div>Designed for pediatric TB awareness</div>
        </div>
      </div>
    </footer>
  );
}
