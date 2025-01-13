import { Copy, Info } from 'lucide-react';
import { useRef } from 'react';

interface ResultDisplayProps {
  enhancedPrompt: string;
  thingsImproved: string[];
}

export function ResultDisplay({ enhancedPrompt, thingsImproved }: ResultDisplayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
  };

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Enhanced Prompt</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={openDialog}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Info className="w-4 h-4" />
            Improvements Made
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="whitespace-pre-wrap text-gray-700">{enhancedPrompt}</p>
      </div>

      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded-lg p-6 backdrop:bg-black backdrop:bg-opacity-50"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Improvements Made</h3>
            <button
              onClick={closeDialog}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            {thingsImproved.map((improvement, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span className="text-gray-700">{improvement}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={closeDialog}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ResultDisplay;