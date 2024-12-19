import React from 'react';
import { Context } from '../../types/context';

interface ContextSuggestionsProps {
  suggestions: Context[];
  selectedIndex: number;
  onSelect: (context: Context) => void;
}

export function ContextSuggestions({
  suggestions,
  selectedIndex,
  onSelect,
}: ContextSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
      {suggestions.map((context, index) => (
        <button
          key={context.id}
          className={`w-full text-left px-4 py-2 hover:bg-purple-50 ${
            index === selectedIndex ? 'bg-purple-100' : ''
          }`}
          onClick={() => onSelect(context)}
        >
          <div className="font-medium text-gray-900">{context.name}</div>
          <div className="text-sm text-gray-500">{context.description}</div>
        </button>
      ))}
    </div>
  );
}