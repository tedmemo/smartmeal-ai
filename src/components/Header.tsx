import { Brain, ChefHat, Settings, Calendar, ListChecks, Bot } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  activeTab: 'plan' | 'meals' | 'shopping' | 'ai-chef';
  onTabChange: (tab: 'plan' | 'meals' | 'shopping' | 'ai-chef') => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick, activeTab, onTabChange }) => {
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="h-8 w-8 md:h-10 md:w-10 text-primary animate-bounce-gentle" />
              <ChefHat className="h-4 w-4 md:h-5 md:w-5 text-accent absolute -bottom-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold gradient-text">
                SmartMeal AI
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden sm:block">
                Intelligent Meal Planning
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => onTabChange('plan')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'plan'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Meal Plan
              </button>
              <button
                onClick={() => onTabChange('meals')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'meals'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Meals
              </button>
              <button
                onClick={() => onTabChange('shopping')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'shopping'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Shopping
              </button>
              <button
                onClick={() => onTabChange('ai-chef')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                  activeTab === 'ai-chef'
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <ChefHat className="h-3 w-3" />
                <span>AI Chef</span>
              </button>
            </nav>

            <button
              onClick={onSettingsClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="Settings"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <nav className="flex justify-around py-2">
            <button
              onClick={() => onTabChange('plan')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'plan'
                  ? 'text-primary'
                  : 'text-gray-600'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>Plan</span>
            </button>
            <button
              onClick={() => onTabChange('meals')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'meals'
                  ? 'text-primary'
                  : 'text-gray-600'
              }`}
            >
              <ChefHat className="h-4 w-4" />
              <span>Meals</span>
            </button>
            <button
              onClick={() => onTabChange('shopping')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'shopping'
                  ? 'text-primary'
                  : 'text-gray-600'
              }`}
            >
              <ListChecks className="h-4 w-4" />
              <span>Shop</span>
            </button>
            <button
              onClick={() => onTabChange('ai-chef')}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'ai-chef'
                  ? 'text-primary'
                  : 'text-gray-600'
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>AI Chef</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 