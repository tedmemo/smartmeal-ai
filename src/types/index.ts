export interface Meal {
  id: string;
  name: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  calories: number;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  tags: string[];
  imageUrl?: string;
}

export interface MealPlan {
  id: string;
  userId: string;
  week: string;
  meals: {
    [day: string]: {
      breakfast?: Meal;
      lunch?: Meal;
      dinner?: Meal;
      snacks?: Meal[];
    };
  };
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  preferredCuisines: string[];
  cookingSkillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  timeConstraints: number; // minutes per day for cooking
  budgetRange: 'Low' | 'Medium' | 'High';
}

export interface MealPlanRequest {
  preferences: UserPreferences;
  duration: number; // days
  mealsPerDay: number;
} 