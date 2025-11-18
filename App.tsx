import React, { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import Results from './components/Results';
import { analyzeImage } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (base64: string) => {
    setPreviewUrl(base64);
    setError(null);
    setIsAnalyzing(true);

    try {
      const analysisData = await analyzeImage(base64);
      setResult(analysisData);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full">
        <Header />

        <main className="w-full">
            {error && (
                <div className="mb-4 p-3 bg-red-900 text-red-200 rounded text-center">
                    {error}
                </div>
            )}

            {isAnalyzing && (
                <div className="text-center p-10">
                    <p className="text-xl font-semibold text-gray-200">Analyzing image...</p>
                    <p className="text-gray-400">Please wait.</p>
                </div>
            )}

            {!isAnalyzing && !result && (
                <UploadZone onImageSelect={handleImageSelect} />
            )}

            {!isAnalyzing && result && previewUrl && (
                <Results 
                    result={result} 
                    imagePreview={previewUrl} 
                    reset={handleReset} 
                />
            )}
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-300">
            ⚠️Warning: This site is not 100% accurate.
        </footer>
    </div>
  );
};
 
export default App;