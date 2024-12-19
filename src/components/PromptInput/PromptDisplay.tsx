import React, { forwardRef } from 'react';
import { ContextPlaceholder } from '../../types/context';
import { getDisplayValue } from '../../utils/promptUtils';

interface PromptDisplayProps {
  value: string;
  placeholders: ContextPlaceholder[];
  error: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const PromptDisplay = forwardRef<HTMLTextAreaElement, PromptDisplayProps>(
  ({ value, placeholders, error, onChange, onKeyDown }, ref) => {
    const displayValue = getDisplayValue(value, placeholders);

    return (
      <textarea
        ref={ref}
        id="prompt"
        rows={15}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="Type your prompt here..."
        value={displayValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    );
  }
);