export interface Context {
  id: string;
  name: string;
  description: string;
  template: string;
  type: 'text' | 'document' | 'image';
  content: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  dateAdded: string;
}

export interface ContextPlaceholder {
  id: string;
  contextId: string;
  name: string;
  startIndex: number;
  endIndex: number;
  isExpanded: boolean;
  template: string;
}

export interface Suggestion {
  startIndex: number;
  endIndex: number;
  context: Context;
}