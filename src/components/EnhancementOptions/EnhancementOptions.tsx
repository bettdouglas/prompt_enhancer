import { CheckCircle } from 'lucide-react';

interface Option {
  id: string;
  label: string;
  description: string;
}

const enhancementOptions: Option[] = [
  {
    id: 'clarity',
    label: 'Improve Clarity',
    description: 'Make instructions explicit and unambiguous',
  },
  {
    id: 'context',
    label: 'Add Context',
    description: 'Include relevant background information',
  },
  {
    id: 'conciseness',
    label: 'Enhance Conciseness',
    description: 'Remove redundant information',
  },
];

interface EnhancementOptionsProps {
  selectedOptions: string[];
  onToggleOption: (id: string) => void;
}

export function EnhancementOptions({ selectedOptions, onToggleOption }: EnhancementOptionsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Enhancement Options</h2>
      <div className="space-y-2">
        {enhancementOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onToggleOption(option.id)}
            className={`w-full p-3 rounded-lg border ${
              selectedOptions.includes(option.id)
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-500'
            } transition-colors`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle
                className={`w-5 h-5 ${
                  selectedOptions.includes(option.id) ? 'text-purple-500' : 'text-gray-400'
                }`}
              />
              <div className="text-left">
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">{option.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}