import { useState, useEffect } from 'react';
import { Context } from '../types/context';

const STORAGE_KEY = 'contextLibrary';

export function useContextLibrary() {
  const [contexts, setContexts] = useState<Context[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contexts));
  }, [contexts]);

  const addContext = (context: Context) => {
    setContexts((prev) => [...prev, context]);
  };

  const deleteContext = (id: string) => {
    setContexts((prev) => prev.filter((context) => context.id !== id));
  };

  const findMatchingContexts = (text: string): Context[] => {
    const searchTerm = text.toLowerCase();
    return contexts.filter(
      (context) =>
        context.name.toLowerCase().includes(searchTerm) ||
        context.description.toLowerCase().includes(searchTerm)
    );
  };

  return {
    contexts,
    addContext,
    deleteContext,
    findMatchingContexts,
  };
}