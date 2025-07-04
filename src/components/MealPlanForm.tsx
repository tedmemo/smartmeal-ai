import { useState } from 'react';
import { Plus, Minus, Clock, DollarSign, Users, Target, ChefHat } from 'lucide-react';
import { UserPreferences, MealPlanRequest } from '../types';

interface MealPlanFormProps {
  onSubmit: (request: MealPlanRequest) => void;
  isLoading?: boolean;
}

const MealPlanForm: React.FC<MealPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    cuisineTypes: [],
    dietaryGoal: 'Family Nutrition',
    numberOfPeople: 2,
    planningDays: 7,
    budgetRange: { min: 20, max: 35 },
    dietaryRestrictions: [],
    allergies: [],
    cookingSkillLevel: 'Intermediate',
    timeConstraints: 30,
    preferredMealComplexity: 'Moderate',
    kitchenEquipment: ['Basic cooking equipment']
  });

  const [generateShoppingList, setGenerateShoppingList] = useState(true);

  // Enhanced options for Australian context
  const cuisineOptions = [
    'Vietnamese', 'Mexican', 'Italian', 'Mediterranean', 'Healthy', 'Asian', 'Australian', 'Indian'
  ];

  const dietaryGoalOptions = [
    'Weight Loss', 'Muscle Building', 'Family Nutrition', 'Budget-Friendly'
  ];

  const dietaryRestrictionOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb', 'Dairy-Free', 'Low-Sodium'
  ];

  const allergyOptions = [
    'Nuts', 'Shellfish', 'Eggs', 'Dairy', 'Soy', 'Gluten', 'Fish', 'Sesame', 'Peanuts'
  ];

  const kitchenEquipmentOptions = [
    'Basic cooking equipment', 'Oven', 'Microwave', 'Slow cooker', 'Air fryer', 'Food processor', 'Blender', 'Grill'
  ];

  const handleCheckboxChange = (
    category: keyof Pick<UserPreferences, 'cuisineTypes' | 'dietaryRestrictions' | 'allergies' | 'kitchenEquipment'>,
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
      preferences: {
        ...preferences,
        planningDays: 7
      },
      duration: 7,
      mealsPerDay: 3,
      generateShoppingList
    });
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-3">
          Create Your AI-Powered Meal Plan
        </h2>
        <p className="text-gray-600 text-lg">
          Tell us about your preferences and we'll use AI to create a personalized meal plan with Australian ingredients and pricing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Settings */}
        <div className="mb-6">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <Users className="h-4 w-4 mr-2" />
            Number of People
          </label>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, numberOfPeople: Math.max(1, prev.numberOfPeople - 1) }))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-xl font-semibold min-w-[50px] text-center bg-gray-50 py-2 px-4 rounded-lg">
              {preferences.numberOfPeople}
            </span>
            <button
              type="button"
              onClick={() => setPreferences(prev => ({ ...prev, numberOfPeople: Math.min(8, prev.numberOfPeople + 1) }))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dietary Goal */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
            <Target className="h-4 w-4 mr-2" />
            Dietary Goal
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dietaryGoalOptions.map(goal => (
              <label key={goal} className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${
                preferences.dietaryGoal === goal
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}>
                <input
                  type="radio"
                  name="dietaryGoal"
                  checked={preferences.dietaryGoal === goal}
                  onChange={() => setPreferences(prev => ({ ...prev, dietaryGoal: goal as any }))}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-center">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget Range (AUD per person per day)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Minimum</label>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={preferences.budgetRange.min}
                onChange={(e) => setPreferences(prev => ({ 
                  ...prev, 
                  budgetRange: { ...prev.budgetRange, min: parseInt(e.target.value) }
                }))}
                className="w-full"
              />
              <div className="text-center text-sm font-medium text-primary">
                ${preferences.budgetRange.min} AUD
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Maximum</label>
              <input
                type="range"
                min="15"
                max="50"
                step="5"
                value={preferences.budgetRange.max}
                onChange={(e) => setPreferences(prev => ({ 
                  ...prev, 
                  budgetRange: { ...prev.budgetRange, max: parseInt(e.target.value) }
                }))}
                className="w-full"
              />
              <div className="text-center text-sm font-medium text-primary">
                ${preferences.budgetRange.max} AUD
              </div>
            </div>
          </div>
        </div>

        {/* Cuisine Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Preferred Cuisine Types
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {cuisineOptions.map(cuisine => (
              <label key={cuisine} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={preferences.cuisineTypes.includes(cuisine)}
                  onChange={() => handleCheckboxChange('cuisineTypes', cuisine)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{cuisine}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Dietary Restrictions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dietaryRestrictionOptions.map(restriction => (
              <label key={restriction} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={preferences.dietaryRestrictions.includes(restriction)}
                  onChange={() => handleCheckboxChange('dietaryRestrictions', restriction)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{restriction}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Allergies & Intolerances
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allergyOptions.map(allergy => (
              <label key={allergy} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={preferences.allergies.includes(allergy)}
                  onChange={() => handleCheckboxChange('allergies', allergy)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{allergy}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cooking Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
              <ChefHat className="h-4 w-4 mr-2" />
              Cooking Skill Level
            </label>
            <div className="space-y-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(level => (
                <label key={level} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Meal Complexity
            </label>
            <div className="space-y-2">
              {(['Simple', 'Moderate', 'Complex'] as const).map(complexity => (
                <label key={complexity} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="complexity"
                    checked={preferences.preferredMealComplexity === complexity}
                    onChange={() => setPreferences(prev => ({ ...prev, preferredMealComplexity: complexity }))}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{complexity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
              <Clock className="h-4 w-4 mr-2" />
              Cooking Time (minutes/day)
            </label>
            <input
              type="range"
              min="15"
              max="120"
              step="15"
              value={preferences.timeConstraints}
              onChange={(e) => setPreferences(prev => ({ ...prev, timeConstraints: parseInt(e.target.value) }))}
              className="w-full mb-2"
            />
            <div className="text-center text-sm font-medium text-primary">
              {preferences.timeConstraints} minutes
            </div>
          </div>
        </div>

        {/* Kitchen Equipment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Available Kitchen Equipment
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {kitchenEquipmentOptions.map(equipment => (
              <label key={equipment} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={preferences.kitchenEquipment.includes(equipment)}
                  onChange={() => handleCheckboxChange('kitchenEquipment', equipment)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{equipment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Shopping List Option */}
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="generateShoppingList"
            checked={generateShoppingList}
            onChange={(e) => setGenerateShoppingList(e.target.checked)}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="generateShoppingList" className="text-sm font-medium text-gray-700 cursor-pointer">
            Generate shopping list with Australian pricing
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Generating AI Meal Plan...</span>
            </>
          ) : (
            <>
              <span>🧠 Generate AI Meal Plan</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default MealPlanForm; 