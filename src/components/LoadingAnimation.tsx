import { Loader2, ChefHat } from 'lucide-react';

interface LoadingAnimationProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  message = "Generating your meal plan...", 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative mb-4">
        <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
        <ChefHat className="h-4 w-4 text-accent absolute -top-1 -right-1 animate-bounce" />
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {message}
        </h3>
        <div className="flex space-x-1 justify-center">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce"></div>
          <div className="h-2 w-2 bg-accent rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="h-2 w-2 bg-orange rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 