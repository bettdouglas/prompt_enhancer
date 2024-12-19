import { Context } from '../types/context';

// This would typically come from an API or local storage
export const contextLibrary: Context[] = [
  {
    id: '1',
    name: 'Professional Email',
    description: 'Template for formal business communication',
    template: 'Dear [recipient], I am writing regarding [subject]...',
  },
  {
    id: '2',
    name: 'Technical Documentation',
    description: 'Structure for technical documentation',
    template: '## Overview\n\n[description]\n\n## Implementation\n\n[details]',
  },
  {
    id: '3',
    name: 'Bug Report',
    description: 'Standard bug report format',
    template: 'Issue: [description]\nSteps to reproduce:\n1. [steps]\nExpected: [result]',
  },
];

export function findMatchingContexts(text: string): Context[] {
  const searchTerm = text.toLowerCase();
  return contextLibrary.filter(
    (context) =>
      context.name.toLowerCase().includes(searchTerm) ||
      context.description.toLowerCase().includes(searchTerm)
  );
}