'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function ProfilePage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await apiFetch('/auth/profile');
        setForm({ name: data.name, email: data.email, password: '' });
      } catch (err) {
        setError(err.message);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    try {
      await apiFetch('/auth/profile', { method: 'PUT', body: JSON.stringify(form) });
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEBE6]">
      <nav className="flex justify-between items-center px-6 py-4 bg-[#FAF9F6] border-b border-gray-200">
        <span className="font-bold text-gray-900">TaskFlow</span>
        <a href="/" className="text-xs text-gray-500 hover:text-gray-800">Back to Tasks</a>
      </nav>

      <div className="flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-sm bg-[#FAF9F6] rounded-3xl shadow-xl p-8">
          <p className="text-xs tracking-wide text-gray-400 mb-1">ACCOUNT</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile</h1>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="space-y-4 mb-6">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-200 py-2 text-sm outline-none focus:border-gray-400"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-200 py-2 text-sm outline-none focus:border-gray-400"
            />
            <input
              name="password"
              type="password"
              placeholder="New password (leave blank to keep current)"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-gray-200 py-2 text-sm outline-none focus:border-gray-400"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#F5C242] text-gray-900 text-sm font-semibold py-3 rounded-full hover:brightness-95"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}