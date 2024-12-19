import React, { useState } from 'react';
import { ContextUploader } from './ContextUploader';
import { ContextList } from './ContextList';
import { Context } from '../../types/context';
import { useContextLibrary } from '../../hooks/useContextLibrary';

export function ContextLibrary() {
  const { contexts, addContext, deleteContext } = useContextLibrary();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (files: File[]) => {
    setIsUploading(true);
    try {
      for (const file of files) {
        const reader = new FileReader();
        
        reader.onload = async (e) => {
          const content = e.target?.result as string;
          const type = file.type.includes('image') 
            ? 'image' 
            : file.type.includes('text') || file.type.includes('document')
            ? 'document'
            : 'text';

          const newContext: Context = {
            id: crypto.randomUUID(),
            name: file.name.split('.')[0],
            description: `Uploaded ${type} context`,
            template: content,
            type,
            content,
            fileName: file.name,
            fileSize: file.size,
            dateAdded: new Date().toISOString(),
            fileUrl: type === 'image' ? URL.createObjectURL(file) : undefined
          };

          addContext(newContext);
        };

        reader.readAsText(file);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Context Library</h2>
        <span className="text-sm text-gray-500">
          {contexts.length} {contexts.length === 1 ? 'context' : 'contexts'}
        </span>
      </div>
      
      <ContextUploader onUpload={handleUpload} />
      
      {isUploading && (
        <div className="text-center text-sm text-gray-500">
          Uploading files...
        </div>
      )}
      
      {contexts.length > 0 ? (
        <ContextList contexts={contexts} onDelete={deleteContext} />
      ) : (
        <div className="text-center text-gray-500 py-8">
          No contexts added yet. Upload some files to get started.
        </div>
      )}
    </div>
  );
}