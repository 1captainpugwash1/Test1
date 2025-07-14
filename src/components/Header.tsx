import React from 'react';
import { CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="bg-indigo-600 p-3 rounded-full">
          <CheckSquare className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800">Task Tracker</h1>
      </div>
      <p className="text-gray-600 text-lg">
        Stay organized and get things done with style
      </p>
    </header>
  );
}