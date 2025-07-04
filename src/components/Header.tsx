import { Brain, ChefHat } from 'lucide-react';

const Header: React.FC = () => {
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
          
          <div className="md:hidden">
            <button className="btn-primary text-sm px-4 py-2">
              Start
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 