import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File } from 'lucide-react';

interface ContextUploaderProps {
  onUpload: (files: File[]) => void;
}

export function ContextUploader({ onUpload }: ContextUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md', '.doc', '.docx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-300 hover:border-purple-500'
        }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">
        {isDragActive
          ? 'Drop your files here...'
          : 'Drag & drop files here, or click to select'}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Supports text files, documents, and images
      </p>
    </div>
  );
}