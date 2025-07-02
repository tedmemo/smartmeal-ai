import { useState } from 'react';
import { Plus, Minus, Utensils, Clock, DollarSign } from 'lucide-react';
import { UserPreferences, MealPlanRequest } from '../types';

interface MealPlanFormProps {
  onSubmit: (request: MealPlanRequest) => void;
  isLoading?: boolean;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    allergies: [],
    preferredCuisines: [],
    cookingSkillLevel: 'Intermediate',
    timeConstraints: 30,
    budgetRange: 'Medium'
  });

  const [duration, setDuration] = useState(7);
  const [mealsPerDay, setMealsPerDay] = useState(3);

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Mediterranean', 'Low-Carb', 'Dairy-Free'
  ];

  const cuisineOptions = [
    'Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian', 'Thai', 'French'
  ];

  const allergyOptions = [
    'Nuts', 'Shellfish', 'Eggs', 'Dairy', 'Soy', 'Gluten', 'Fish', 'Sesame'
  ];

  const handleCheckboxChange = (
    category: keyof Pick<UserPreferences, 'dietaryRestrictions' | 'allergies' | 'preferredCuisines'>,
    value: string
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      preferences,
      duration,
      mealsPerDay
    });
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Create Your Meal Plan
        </h2>
        <p className="text-gray-600">
          Tell us about your preferences and we'll create a personalized meal plan for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Duration and Meals Per Day */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan Duration (days)
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setDuration(Math.max(1, duration - 1))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-semibold min-w-[40px] text-center">
                {duration}
              </span>
              <button
                type="button"
                onClick={() => setDuration(Math.min(30, duration + 1))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meals per Day
            </label>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setMealsPerDay(Math.max(1, mealsPerDay - 1))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-semibold min-w-[40px] text-center">
                {mealsPerDay}
              </span>
              <button
                type="button"
                onClick={() => setMealsPerDay(Math.min(6, mealsPerDay + 1))}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dietary Restrictions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {dietaryOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.dietaryRestrictions.includes(option)}
                  onChange={() => handleCheckboxChange('dietaryRestrictions', option)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Allergies
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {allergyOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.allergies.includes(option)}
                  onChange={() => handleCheckboxChange('allergies', option)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preferred Cuisines */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred Cuisines
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {cuisineOptions.map(option => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.preferredCuisines.includes(option)}
                  onChange={() => handleCheckboxChange('preferredCuisines', option)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cooking Skill Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Utensils className="inline h-4 w-4 mr-1" />
            Cooking Skill Level
          </label>
          <div className="flex space-x-4">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map(level => (
              <label key={level} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="skillLevel"
                  checked={preferences.cookingSkillLevel === level}
                  onChange={() => setPreferences(prev => ({ ...prev, cookingSkillLevel: level }))}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Constraints */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Clock className="inline h-4 w-4 mr-1" />
            Available Cooking Time (minutes per day)
          </label>
          <input
            type="range"
            min="15"
            max="120"
            step="15"
            value={preferences.timeConstraints}
            onChange={(e) => setPreferences(prev => ({ ...prev, timeConstraints: parseInt(e.target.value) }))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>15 min</span>
            <span className="font-medium">{preferences.timeConstraints} min</span>
            <span>120 min</span>
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Budget Range
          </label>
          <div className="flex space-x-4">
            {(['Low', 'Medium', 'High'] as const).map(budget => (
              <label key={budget} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="budget"
                  checked={preferences.budgetRange === budget}
                  onChange={() => setPreferences(prev => ({ ...prev, budgetRange: budget }))}
                  className="text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{budget}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating Plan...' : 'Generate Meal Plan'}
        </button>
      </form>
    </div>
  );
};

export default MealPlanForm; 