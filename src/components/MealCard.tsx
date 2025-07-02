import { Clock, Users, ChefHat, Star } from 'lucide-react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
  onClick?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onClick }) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      className="card cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative mb-4">
        {meal.imageUrl ? (
          <img 
            src={meal.imageUrl} 
            alt={meal.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
            <ChefHat className="h-16 w-16 text-primary/40" />
          </div>
        )}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[meal.difficulty]}`}>
          {meal.difficulty}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {meal.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {meal.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{meal.cookingTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{meal.servings} servings</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-orange fill-current" />
            <span>{meal.calories} cal</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {meal.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {meal.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{meal.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealCard; 