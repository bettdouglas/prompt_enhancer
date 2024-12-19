import React from 'react';
import { Wand2 } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <Wand2 className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Prompt Enhancer</h1>
      </div>
    </header>
  );
}