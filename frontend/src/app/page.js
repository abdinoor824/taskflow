'use client';

import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = async () => {
    try {
      await apiFetch('/auth/profile');
      router.push('/dashboard');
    } catch {
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEBE6] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-xs tracking-wide text-gray-400 mb-2">ORGANIZE YOUR DAY</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">TaskFlow</h1>
      <p className="text-gray-500 max-w-sm mb-8">
        A simple, clean way to track your daily tasks — add, check off, and stay on top of things.
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleGetStarted}
          className="bg-[#F5C242] text-gray-900 text-sm font-semibold px-6 py-3 rounded-full hover:brightness-95"
        >
          Add a Task
        </button>
        <a
          href="/login"
          className="border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 rounded-full hover:bg-white"
        >
          Log In
        </a>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        New here?{' '}
        <a href="/register" className="text-gray-900 font-semibold hover:underline">
          Create an account
        </a>
      </p>
    </div>
  );
}