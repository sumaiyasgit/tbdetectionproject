import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import XrayUpload from '../components/XrayUpload';

export default function Upload() {
  const navigate = useNavigate();

  function handleResult(data) {
    // attach data to sessionStorage so Results page can read it
    sessionStorage.setItem('tb_result', JSON.stringify(data));
    navigate('/results');
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Upload X-ray</h1>
      <XrayUpload onResult={handleResult} />
      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Note:</strong> Do not rely on this app for medical diagnosis. This is a demo integration; final decisions must be made by qualified clinicians.</p>
      </div>
    </div>
  );
}

