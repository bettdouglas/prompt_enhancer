import { useState } from 'react';
import { EnhancementOptions } from './components/EnhancementOptions/EnhancementOptions';
import { Header } from './components/Layout/Header';
import { PromptInput } from './components/PromptInput/PromptInput';
import { ResultDisplay } from './components/ResultDisplay/ResultDisplay';
import { enhancePrompt } from './utils/enhancePrompt';

function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [enhancedPrompt, setEnhancedPrompt] = useState('');

  const handleToggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((opt) => opt !== id) : [...prev, id]
    );
  };

  const handleEnhancePrompt = async () => {
    const result = await enhancePrompt(prompt, selectedOptions);
    setEnhancedPrompt(result);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PromptInput
              value={prompt}
              onChange={setPrompt}
              onSubmit={handleEnhancePrompt}
            />
            <EnhancementOptions
              selectedOptions={selectedOptions}
              onToggleOption={handleToggleOption}
            />
            {enhancedPrompt && <ResultDisplay enhancedPrompt={enhancedPrompt} />}
          </div>
          {/* <div className="lg:col-span-1">
            <ContextLibrary />
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default App;