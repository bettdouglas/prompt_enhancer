import React from 'react';
import { File, Image, FileText, Trash2 } from 'lucide-react';
import { Context } from '../../types/context';

interface ContextListProps {
  contexts: Context[];
  onDelete: (id: string) => void;
}

export function ContextList({ contexts, onDelete }: ContextListProps) {
  const getIcon = (type: Context['type']) => {
    switch (type) {
      case 'document':
        return <File className="w-5 h-5" />;
      case 'image':
        return <Image className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="space-y-4">
      {contexts.map((context) => (
        <div
          key={context.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="text-gray-500">{getIcon(context.type)}</div>
            <div>
              <h3 className="font-medium text-gray-900">{context.name}</h3>
              <div className="text-sm text-gray-500">
                {context.fileName && (
                  <span className="mr-2">{context.fileName}</span>
                )}
                {context.fileSize && (
                  <span className="mr-2">({formatFileSize(context.fileSize)})</span>
                )}
                <span>{formatDate(context.dateAdded)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onDelete(context.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Delete context"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}