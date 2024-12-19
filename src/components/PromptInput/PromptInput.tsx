import { AlertCircle } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useContextSuggestions } from '../../hooks/useContextSuggestions';
import { Context, ContextPlaceholder } from '../../types/context';
import { ContextPlaceholder as ContextPlaceholderComponent } from './ContextPlaceholder';
import { ContextSuggestions } from './ContextSuggestions';
import { PromptDisplay } from './PromptDisplay';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function PromptInput({ value, onChange, onSubmit }: PromptInputProps) {
  const [error, setError] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [placeholders, setPlaceholders] = useState<ContextPlaceholder[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    suggestions,
    selectedIndex,
    handleKeyDown: handleSuggestionKeyDown,
    handleInputChange: handleSuggestionChange,
    insertContext,
    clearSuggestions
  } = useContextSuggestions(value, cursorPosition, onChange);

  const validateInput = (text: string) => {
    // if (text.length > 1000) {
      // setError('Prompt cannot exceed 1000 characters');
      // return false;
    // }
    if (text.trim().length === 0) {
      setError('Prompt cannot be empty');
      return false;
    }
    setError('');
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const newCursorPos = e.target.selectionStart || 0;
    
    onChange(newValue);
    validateInput(newValue);
    setCursorPosition(newCursorPos);
    handleSuggestionChange(newValue, newCursorPos);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleSuggestionKeyDown(e, () => {
      const selectedContext = suggestions[selectedIndex];
      if (selectedContext) {
        insertContextPlaceholder(selectedContext);
      }
    });
  };

  const insertContextPlaceholder = (context: Context) => {
    const { newValue, placeholder } = insertContext(context);
    setPlaceholders((prev) => [...prev, placeholder]);
    clearSuggestions();
    
    if (textareaRef.current) {
      const newCursorPos = placeholder.endIndex;
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  };

  const togglePlaceholder = (id: string) => {
    setPlaceholders((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isExpanded: !p.isExpanded } : p
      )
    );
  };

  const handleSubmit = () => {
    if (validateInput(value)) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          Enter your prompt
        </label>
        <div className="relative">
          <PromptDisplay
            ref={textareaRef}
            value={value}
            placeholders={placeholders}
            error={!!error}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <ContextSuggestions
            suggestions={suggestions}
            selectedIndex={selectedIndex}
            onSelect={insertContextPlaceholder}
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {placeholders.map((placeholder) => (
          <ContextPlaceholderComponent
            key={placeholder.id}
            placeholder={placeholder}
            onToggle={togglePlaceholder}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!!error}
        className={`w-full py-2 px-4 rounded-lg transition-colors ${
          error
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        Enhance Prompt
      </button>
    </div>
  );
}