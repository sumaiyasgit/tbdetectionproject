import React, { useState } from 'react';
import axios from 'axios';

export default function XrayUpload({ onResult }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;

    if (!f.type.startsWith('image/')) {
      setError('Please upload a valid image (jpg/png).');
      return;
    }

    setError('');
    setFile(f);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!file) {
      setError('Please choose an X-ray image first.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Set VITE_API_URL (see .env.example) when the backend is not on this computer
      const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
      const BACKEND_URL = `${API_URL}/predict`;

      // ONLY REAL BACKEND CALL — no mock
      const response = await axios.post(BACKEND_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 20000
      });

      // pass REAL backend response to parent Upload page
      if (onResult) {
        onResult(response.data);
      }

    } catch (err) {
      console.error("Upload failed:", err);
      setError('Failed to analyze X-ray. Check backend connection.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload child’s chest X-ray</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 
                       file:mr-4 file:py-2 file:px-4 file:rounded 
                       file:border-0 file:bg-indigo-50 file:text-indigo-700 
                       cursor-pointer"
          />
        </label>

        {preview && (
          <div className="border rounded p-2">
            <img src={preview} alt="X-ray preview"
                 className="w-full object-contain max-h-80" />
          </div>
        )}

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Analyze X-ray'}
          </button>

          <button
            type="button"
            onClick={() => { setFile(null); setPreview(null); setError(''); }}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}
