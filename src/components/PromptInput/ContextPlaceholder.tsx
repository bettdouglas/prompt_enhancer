import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ContextPlaceholder as ContextPlaceholderType } from '../../types/context';

interface ContextPlaceholderProps {
  placeholder: ContextPlaceholderType;
  onToggle: (id: string) => void;
}

export function ContextPlaceholder({ placeholder, onToggle }: ContextPlaceholderProps) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 rounded cursor-pointer hover:bg-purple-200"
      onClick={() => onToggle(placeholder.id)}
    >
      <span className="text-sm font-medium">{placeholder.name}</span>
      {placeholder.isExpanded ? (
        <ChevronUp className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
    </span>
  );
}