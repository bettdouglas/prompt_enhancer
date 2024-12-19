import { useState, useCallback } from 'react';
import { Context, ContextPlaceholder } from '../types/context';
import { findMatchingContexts } from '../utils/contextLibrary';

export function useContextSuggestions(
  value: string,
  cursorPosition: number,
  onChange: (value: string) => void
) {
  const [suggestions, setSuggestions] = useState<Context[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState('');

  const handleInputChange = useCallback((newValue: string, cursorPos: number) => {
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const match = textBeforeCursor.match(/\S+$/);
    const word = match ? match[0] : '';
    setCurrentWord(word);

    if (word.length >= 2) {
      const matches = findMatchingContexts(word);
      setSuggestions(matches);
      setSelectedIndex(0);
    } else {
      setSuggestions([]);
    }
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
    onSelect: () => void
  ) => {
    if (suggestions.length === 0) return;

    if (e.key === 'Tab' || (e.key === 'Enter' && e.ctrlKey)) {
      e.preventDefault();
      onSelect();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
    }
  };

  const insertContext = (context: Context) => {
    const beforeWord = value.slice(0, cursorPosition - currentWord.length);
    const afterCursor = value.slice(cursorPosition);

    const placeholderId = crypto.randomUUID();
    const placeholder: ContextPlaceholder = {
      id: placeholderId,
      contextId: context.id,
      name: context.name,
      startIndex: beforeWord.length,
      endIndex: beforeWord.length + context.name.length + 2,
      isExpanded: false,
      template: context.template
    };

    const newValue = `${beforeWord}[${context.name}]${afterCursor}`;
    onChange(newValue);

    return { newValue, placeholder };
  };

  const clearSuggestions = () => {
    setSuggestions([]);
    setSelectedIndex(0);
    setCurrentWord('');
  };

  return {
    suggestions,
    selectedIndex,
    handleKeyDown,
    handleInputChange,
    insertContext,
    clearSuggestions,
  };
}