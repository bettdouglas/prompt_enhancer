import { Copy, Info } from 'lucide-react';

interface ResultDisplayProps {
  enhancedPrompt: string;
  thingsImproved: string[];
}

export function ResultDisplay({ enhancedPrompt, thingsImproved }: ResultDisplayProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
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
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            title={thingsImproved.join(', ')}
          >
            <Info className="w-4 h-4" />
            Info
          </button>
        </div>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="whitespace-pre-wrap text-gray-700">{enhancedPrompt}</p>
      </div>
    </div>
  );
}