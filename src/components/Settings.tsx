import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Key, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import openaiService from '../services/openaiService';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setIsApiKeyConfigured(openaiService.isApiKeyConfigured());
    }
  }, [isOpen]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setStatus('error');
      return;
    }

    setStatus('saving');
    
    try {
      openaiService.setApiKey(apiKey.trim());
      setIsApiKeyConfigured(true);
      setStatus('success');
      setApiKey('');
      
      // Clear success message after 2 seconds
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      setStatus('error');
    }
  };

  const handleRemoveApiKey = () => {
    openaiService.removeApiKey();
    setIsApiKeyConfigured(false);
    setStatus('success');
    
    // Clear success message after 2 seconds
    setTimeout(() => setStatus('idle'), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* API Key Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-gray-900">OpenAI API Key</h3>
          </div>
          
          <p className="text-sm text-gray-600">
            Add your OpenAI API key to enable AI-powered meal planning and customization features.
          </p>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 text-sm">
                {isApiKeyConfigured ? 'API key removed successfully!' : 'API key saved successfully!'}
              </span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <span className="text-red-800 text-sm">
                Please enter a valid API key.
              </span>
            </div>
          )}

          {/* API Key Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isApiKeyConfigured}
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {!isApiKeyConfigured ? (
              <button
                onClick={handleSaveApiKey}
                disabled={status === 'saving'}
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {status === 'saving' ? 'Saving...' : 'Save API Key'}
              </button>
            ) : (
              <button
                onClick={handleRemoveApiKey}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Remove API Key
              </button>
            )}
          </div>

          {/* Current Status */}
          {isApiKeyConfigured && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 text-sm font-medium">
                  API key is configured ✓
                </span>
              </div>
              <p className="text-blue-700 text-xs mt-1">
                AI features are now enabled. Your API key is stored locally in your browser.
              </p>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">How to get an OpenAI API key:</h4>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a></li>
              <li>2. Sign in or create an account</li>
              <li>3. Click "Create new secret key"</li>
              <li>4. Copy the key and paste it above</li>
              <li>5. Your key is stored locally and never sent to our servers</li>
            </ol>
          </div>

          {/* Security Note */}
          <div className="text-xs text-gray-500 text-center">
            🔒 Your API key is stored securely in your browser's localStorage and is never transmitted to our servers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 