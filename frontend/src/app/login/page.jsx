'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setError('');
    try {
      await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEBE6] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#FAF9F6] rounded-3xl shadow-xl p-8">
        <p className="text-xs tracking-wide text-gray-400 mb-1">WELCOME BACK</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Log In</h1>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="space-y-4 mb-6">
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-200 py-2 text-sm outline-none focus:border-gray-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-gray-200 py-2 text-sm outline-none focus:border-gray-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#F5C242] text-gray-900 text-sm font-semibold py-3 rounded-full hover:brightness-95 mb-4"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-gray-900 font-semibold hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}