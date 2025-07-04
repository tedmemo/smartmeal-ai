export interface Meal {
  id: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  name: string;
  cuisineType: string;
  description: string;
  cookingTime: number;
  prepTime: number;
  totalTime: number;
  servings: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ingredients: MealIngredient[];
  instructions: string[];
  nutritionalInfo: NutritionalInfo;
  estimatedCostPerServing: number; // in AUD
  healthBenefits: string[];
  cookingTips: string[];
  tags: string[];
  dessert: {
    name: string;
    description: string;
    ingredients: string[];
  };
  imageUrl?: string;
}

export interface MealIngredient {
  name: string;
  quantity: string;
  unit: string;
  estimatedCost?: number; // in AUD
  isOptional?: boolean;
  substitutes?: string[];
}

export interface NutritionalInfo {
  calories: number;
  protein: number; // in grams
  carbohydrates: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  sugar: number; // in grams
  sodium: number; // in mg
  cholesterol?: number; // in mg
  vitamins?: string[];
  minerals?: string[];
}

export type MealPlan = [Meal, Meal, Meal];

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
  estimatedCost?: number; // in AUD
  mealIds: string[]; // Which meals this ingredient is for
}

export interface UserPreferences {
  cuisineTypes: string[];
  dietaryGoal: 'Weight Loss' | 'Muscle Building' | 'Family Nutrition' | 'Budget-Friendly';
  numberOfPeople: number; // 1-8
  planningDays: number; // 1-7
  budgetRange: {
    min: number; // AUD per person
    max: number; // AUD per person
  };
  dietaryRestrictions: string[];
  allergies: string[];
  cookingSkillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  timeConstraints: number; // minutes per day for cooking
  preferredMealComplexity: 'Simple' | 'Moderate' | 'Complex';
  kitchenEquipment: string[];
}

export interface MealPlanRequest {
  preferences: UserPreferences;
  duration: number; // days
  mealsPerDay: number;
  generateShoppingList: boolean;
}

export interface AIGenerationProgress {
  stage: 'analyzing' | 'finding' | 'calculating' | 'optimizing' | 'finalizing';
  message: string;
  progress: number; // 0-100
}

export interface MealGenerationResponse {
  meals: Meal[];
  totalCost: number;
  nutritionalSummary: NutritionalInfo;
  shoppingList?: ShoppingListItem[];
  planSummary: string;
  healthInsights: string[];
}

export const substitutions: Record<string, Record<string, string>> = {
  "Chicken breast": {
    "vegetarian": "Firm tofu or tempeh",
    "budget": "Chicken thigh (cheaper cut)",
    "vegan": "Seasoned lentils or chickpeas"
  },
  "Greek yogurt": {
    "vegan": "Coconut yogurt or cashew cream",
    "lactose-free": "Lactose-free Greek yogurt"
  }
}; 