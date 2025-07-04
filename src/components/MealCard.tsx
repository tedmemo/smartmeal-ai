import { Clock, Users, ChefHat, DollarSign, Heart, Lightbulb, Star, Award } from 'lucide-react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
  onClick: (meal: Meal) => void;
  onCustomize: (meal: Meal) => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onClick, onCustomize }) => {
  const formatIngredients = (count: number) => {
    return count === 1 ? '1 ingredient' : `${count} ingredients`;
  };

  return (
    <div 
      className="card hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
      onClick={() => onClick(meal)}
    >
      {/* Header with cuisine and category */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{meal.cuisineType}</span>
        </div>
      </div>

      {/* Meal name and description */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
        {meal.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {meal.description}
      </p>

      {/* Key metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-gray-700">{meal.totalTime} min</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Users className="h-4 w-4 text-accent" />
          <span className="text-gray-700">{meal.servings} servings</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <DollarSign className="h-4 w-4 text-orange-500" />
          <span className="text-gray-700 font-medium">${meal.estimatedCostPerServing.toFixed(2)} AUD</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-700">{formatIngredients(meal.ingredients.length)}</span>
        </div>
      </div>

      {/* Difficulty badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          <ChefHat className="h-3 w-3 inline-block mr-1" />
          {meal.difficulty}
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{meal.nutritionalInfo.calories} cal</span>
        </div>
      </div>

      {/* Nutritional highlights */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center">
            <div className="font-semibold text-primary">{meal.nutritionalInfo.protein}g</div>
            <div className="text-gray-500">Protein</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-accent">{meal.nutritionalInfo.carbohydrates}g</div>
            <div className="text-gray-500">Carbs</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-orange-500">{meal.nutritionalInfo.fiber}g</div>
            <div className="text-gray-500">Fiber</div>
          </div>
        </div>
      </div>

      {/* Health benefits preview */}
      {meal.healthBenefits && meal.healthBenefits.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-2">
            <Heart className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">Health Benefits</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-1">
            {meal.healthBenefits[0]}
          </p>
        </div>
      )}

      {/* Cooking tips preview */}
      {meal.cookingTips && meal.cookingTips.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-2">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700">Pro Tip</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-1">
            {meal.cookingTips[0]}
          </p>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-4">
        {meal.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
        {meal.tags.length > 3 && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
            +{meal.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Time breakdown */}
      <div className="border-t pt-3">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Prep: {meal.prepTime}m</span>
          <span>Cook: {meal.cookingTime}m</span>
          <span>Total: {meal.totalTime}m</span>
        </div>
      </div>

      {/* Hover effect indicator */}
      <div className="mt-3 text-center">
        <button
          className="text-xs text-gray-400 group-hover:text-primary transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClick(meal);
          }}
        >
          Click to view full recipe
        </button>
      </div>

      {/* Customize button */}
      <div className="mt-3 text-center">
        <button
          className="text-xs text-gray-400 group-hover:text-primary transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onCustomize(meal);
          }}
        >
          Customize
        </button>
      </div>
    </div>
  );
};

export default MealCard; 