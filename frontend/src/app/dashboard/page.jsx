'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const loadTasks = async () => {
    try {
      const data = await apiFetch('/tasks');
      setTasks(data);
    } catch (err) {
      router.push('/login');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    await apiFetch('/tasks', { method: 'POST', body: JSON.stringify({ title }) });
    setTitle('');
    loadTasks();
  };

  const handleToggle = async (task) => {
    await apiFetch(`/tasks/${task._id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !task.completed }),
    });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await apiFetch(`/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
  };

  const handleLogout = async () => {
    await apiFetch('/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const today = new Date();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  return (
    <div className="min-h-screen bg-[#EDEBE6]">
      <nav className="flex justify-between items-center px-6 py-4 bg-[#FAF9F6] border-b border-gray-200">
        <span className="font-bold text-gray-900">TaskFlow</span>
        <div className="flex items-center gap-5">
          <a href="/profile" className="text-xs text-gray-500 hover:text-gray-800">Profile</a>
          <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-gray-800">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-md bg-[#FAF9F6] rounded-3xl shadow-xl p-8">
          <div className="mb-6">
            <p className="text-xs tracking-wide text-gray-400 mb-1">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()}
            </p>
            <h1 className="text-3xl font-bold text-gray-900">To-Do List</h1>
          </div>

          <div className="flex justify-between mb-6 pb-4 border-b border-gray-200">
            {weekDays.map((d, i) => {
              const date = new Date(startOfWeek);
              date.setDate(startOfWeek.getDate() + i);
              const isToday = date.toDateString() === today.toDateString();
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className={`text-xs ${isToday ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>{d}</span>
                  <span className={`text-sm ${isToday ? 'font-bold text-gray-900 border-b-2 border-gray-900 pb-1' : 'text-gray-400'}`}>
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="flex flex-col sm:flex-row mb-6 gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="Add a task..."
              className="flex-1 min-w-0 w-full bg-transparent border-b border-gray-200 py-2 text-sm outline-none focus:border-gray-400"
            />
            <button
              onClick={handleCreate}
              className="shrink-0 bg-[#F5C242] text-gray-900 text-sm font-semibold px-4 py-2 rounded-full hover:brightness-95 w-full sm:w-auto"
            >
              Add
            </button>
          </div>

          <ul className="divide-y divide-gray-100">
            {tasks.length === 0 && (
              <li className="py-6 text-center text-sm text-gray-400">No tasks yet — add one above.</li>
            )}
            {tasks.map((task) => (
              <li key={task._id} className="flex items-center gap-4 py-4 group">
                <button
                  onClick={() => handleToggle(task)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition
                    ${task.completed ? 'bg-[#F5C242] border-[#F5C242]' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  {task.completed && (
                    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
                      <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold break-words ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {task.title}
                  </p>
                </div>

              <button
  onClick={() => handleDelete(task._id)}
  className="text-xs font-semibold text-gray-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
>
  Delete
</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}