import { Meal } from '../types';

// Mock database of meals for demonstration purposes
// In a real application, this would connect to a database or external API

export const sampleMeals: Meal[] = [
  {
    id: '1',
    mealType: 'Lunch',
    name: 'Mediterranean Quinoa Bowl',
    cuisineType: 'Mediterranean',
    description: 'A nutritious bowl packed with quinoa, roasted vegetables, chickpeas, and a creamy tahini dressing. Perfect for a healthy lunch or light dinner.',
    prepTime: 10,
    cookingTime: 25,
    totalTime: 35,
    servings: 2,
    difficulty: 'Beginner',
    ingredients: [
      { name: 'quinoa', quantity: '1', unit: 'cup', estimatedCost: 3.50, isOptional: false, substitutes: ['brown rice', 'couscous'] },
      { name: 'chickpeas', quantity: '1', unit: 'can', estimatedCost: 1.80, isOptional: false, substitutes: ['black beans', 'lentils'] },
      { name: 'red bell pepper', quantity: '1', unit: 'large', estimatedCost: 2.50, isOptional: false, substitutes: ['yellow pepper'] },
      { name: 'cucumber', quantity: '1', unit: 'medium', estimatedCost: 1.50, isOptional: false, substitutes: ['zucchini'] },
      { name: 'tahini', quantity: '3', unit: 'tbsp', estimatedCost: 2.00, isOptional: false, substitutes: ['almond butter'] },
      { name: 'lemon', quantity: '1', unit: 'whole', estimatedCost: 0.80, isOptional: false, substitutes: ['lime'] },
      { name: 'olive oil', quantity: '2', unit: 'tbsp', estimatedCost: 0.50, isOptional: false, substitutes: [] },
      { name: 'fresh parsley', quantity: '1/4', unit: 'cup', estimatedCost: 1.20, isOptional: true, substitutes: ['cilantro'] }
    ],
    instructions: [
      'Rinse quinoa thoroughly and cook according to package instructions (usually 15 minutes in boiling water)',
      'Drain and rinse chickpeas, then roast in oven at 200°C for 15 minutes until crispy',
      'Dice bell pepper and cucumber into bite-sized pieces',
      'Mix tahini, lemon juice, olive oil, salt, and pepper in a small bowl for dressing',
      'Combine cooked quinoa, vegetables, and chickpeas in serving bowls',
      'Drizzle with tahini dressing and garnish with fresh parsley'
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 18,
      carbohydrates: 58,
      fat: 14,
      fiber: 12,
      sugar: 8,
      sodium: 380,
      vitamins: ['Vitamin C', 'Vitamin K', 'Folate'],
      minerals: ['Iron', 'Magnesium', 'Phosphorus']
    },
    estimatedCostPerServing: 7.40,
    healthBenefits: [
      'High in plant-based protein and fiber',
      'Rich in antioxidants from colorful vegetables',
      'Heart-healthy fats from tahini and olive oil',
      'Supports digestive health'
    ],
    cookingTips: [
      'Toast quinoa in a dry pan before cooking for extra flavor',
      'Add a pinch of cumin to the tahini dressing for depth',
      'Meal prep friendly - stores well for 3-4 days'
    ],
    tags: ['healthy', 'vegetarian', 'high-protein', 'mediterranean', 'meal-prep'],
    dessert: {
      name: 'Greek Yogurt with Honey',
      description: 'Light and creamy Greek yogurt drizzled with local honey',
      ingredients: ['Greek yogurt', 'honey', 'nuts']
    }
  },
  {
    id: '2',
    mealType: 'Dinner',
    name: 'Garlic Herb Salmon with Asparagus',
    cuisineType: 'Australian',
    description: 'Pan-seared salmon fillet seasoned with fresh herbs and garlic, served with roasted asparagus. A protein-rich, low-carb dinner option using local Australian salmon.',
    prepTime: 15,
    cookingTime: 20,
    totalTime: 35,
    servings: 2,
    difficulty: 'Intermediate',
    ingredients: [
      { name: 'salmon fillets', quantity: '2', unit: 'pieces (200g each)', estimatedCost: 16.00, isOptional: false, substitutes: ['barramundi', 'kingfish'] },
      { name: 'garlic cloves', quantity: '4', unit: 'cloves', estimatedCost: 0.50, isOptional: false, substitutes: ['garlic powder'] },
      { name: 'fresh dill', quantity: '2', unit: 'tbsp', estimatedCost: 2.50, isOptional: false, substitutes: ['dried dill', 'parsley'] },
      { name: 'asparagus', quantity: '500', unit: 'g', estimatedCost: 4.50, isOptional: false, substitutes: ['broccolini', 'green beans'] },
      { name: 'olive oil', quantity: '3', unit: 'tbsp', estimatedCost: 0.75, isOptional: false, substitutes: ['avocado oil'] },
      { name: 'lemon', quantity: '1', unit: 'whole', estimatedCost: 0.80, isOptional: false, substitutes: ['lime'] },
      { name: 'butter', quantity: '2', unit: 'tbsp', estimatedCost: 1.00, isOptional: true, substitutes: ['olive oil'] }
    ],
    instructions: [
      'Preheat oven to 220°C',
      'Season salmon fillets with salt, pepper, and minced garlic',
      'Heat olive oil in oven-safe pan over medium-high heat',
      'Sear salmon skin-side up for 3-4 minutes until golden',
      'Flip salmon and add herbs and butter to pan',
      'Toss asparagus with olive oil, salt, and pepper on separate baking sheet',
      'Place both salmon pan and asparagus in oven for 8-10 minutes',
      'Serve immediately with lemon wedges'
    ],
    nutritionalInfo: {
      calories: 380,
      protein: 42,
      carbohydrates: 8,
      fat: 20,
      fiber: 4,
      sugar: 4,
      sodium: 290,
      vitamins: ['Vitamin D', 'Vitamin B12', 'Vitamin K'],
      minerals: ['Selenium', 'Potassium', 'Phosphorus']
    },
    estimatedCostPerServing: 12.55,
    healthBenefits: [
      'Excellent source of omega-3 fatty acids',
      'High-quality complete protein',
      'Supports heart and brain health',
      'Low in carbohydrates, suitable for keto diet'
    ],
    cookingTips: [
      'Don\'t move the salmon while searing for best crust',
      'Check doneness - salmon should flake easily with a fork',
      'Choose thick asparagus spears for better texture'
    ],
    tags: ['seafood', 'low-carb', 'high-protein', 'gluten-free', 'australian'],
    dessert: {
      name: 'Lemon Sorbet',
      description: 'Refreshing lemon sorbet with mint garnish',
      ingredients: ['lemon sorbet', 'mint leaves', 'lemon zest']
    }
  },
  {
    id: '3',
    mealType: 'Breakfast',
    name: 'Aussie Berry Protein Smoothie',
    cuisineType: 'Australian',
    description: 'A refreshing and energizing smoothie with native Australian berries, protein powder, and locally-sourced ingredients. Perfect for breakfast or post-workout recovery.',
    prepTime: 5,
    cookingTime: 0,
    totalTime: 5,
    servings: 1,
    difficulty: 'Beginner',
    ingredients: [
      { name: 'frozen mixed berries', quantity: '1', unit: 'cup', estimatedCost: 3.00, isOptional: false, substitutes: ['fresh berries'] },
      { name: 'vanilla protein powder', quantity: '1', unit: 'scoop (30g)', estimatedCost: 2.50, isOptional: false, substitutes: ['pea protein'] },
      { name: 'almond milk', quantity: '1', unit: 'cup', estimatedCost: 1.50, isOptional: false, substitutes: ['oat milk', 'coconut milk'] },
      { name: 'banana', quantity: '1/2', unit: 'medium', estimatedCost: 0.75, isOptional: false, substitutes: ['mango'] },
      { name: 'Australian honey', quantity: '1', unit: 'tbsp', estimatedCost: 1.00, isOptional: true, substitutes: ['maple syrup'] },
      { name: 'almond butter', quantity: '1', unit: 'tbsp', estimatedCost: 1.25, isOptional: true, substitutes: ['peanut butter'] },
      { name: 'chia seeds', quantity: '1', unit: 'tsp', estimatedCost: 0.50, isOptional: true, substitutes: ['flax seeds'] }
    ],
    instructions: [
      'Add all liquid ingredients to blender first',
      'Add frozen berries, banana, and protein powder',
      'Add honey and almond butter if using',
      'Blend on high speed for 60-90 seconds until completely smooth',
      'Add more almond milk if needed for desired consistency',
      'Pour into glass and top with chia seeds',
      'Serve immediately for best texture and taste'
    ],
    nutritionalInfo: {
      calories: 320,
      protein: 28,
      carbohydrates: 38,
      fat: 8,
      fiber: 8,
      sugar: 28,
      sodium: 180,
      vitamins: ['Vitamin C', 'Vitamin E', 'Vitamin B6'],
      minerals: ['Potassium', 'Magnesium', 'Calcium']
    },
    estimatedCostPerServing: 10.50,
    healthBenefits: [
      'High in antioxidants from Australian berries',
      'Excellent post-workout recovery drink',
      'Supports muscle protein synthesis',
      'Boosts energy and mental clarity'
    ],
    cookingTips: [
      'Use frozen berries for thicker consistency',
      'Add ingredients gradually for better blending',
      'Pre-soak chia seeds for easier digestion'
    ],
    tags: ['smoothie', 'protein', 'quick', 'dairy-free', 'australian', 'post-workout'],
    dessert: {
      name: 'Fresh Fruit Salad',
      description: 'Seasonal Australian fruits with honey drizzle',
      ingredients: ['mixed berries', 'banana', 'honey', 'mint']
    }
  },
  {
    id: '4',
    mealType: 'Dinner',
    name: 'Vietnamese Pho-Inspired Chicken Soup',
    cuisineType: 'Vietnamese',
    description: 'A simplified, family-friendly version of traditional Vietnamese pho with aromatic herbs, tender chicken, and rice noodles. Adapted for Australian kitchens.',
    prepTime: 20,
    cookingTime: 45,
    totalTime: 65,
    servings: 4,
    difficulty: 'Intermediate',
    ingredients: [
      { name: 'chicken thighs', quantity: '800', unit: 'g boneless', estimatedCost: 12.00, isOptional: false, substitutes: ['chicken breast'] },
      { name: 'rice noodles', quantity: '400', unit: 'g dried', estimatedCost: 3.50, isOptional: false, substitutes: ['ramen noodles'] },
      { name: 'beef stock', quantity: '2', unit: 'litres', estimatedCost: 4.00, isOptional: false, substitutes: ['chicken stock'] },
      { name: 'onion', quantity: '1', unit: 'large', estimatedCost: 1.50, isOptional: false, substitutes: [] },
      { name: 'ginger', quantity: '50', unit: 'g fresh', estimatedCost: 2.00, isOptional: false, substitutes: ['ground ginger'] },
      { name: 'star anise', quantity: '3', unit: 'whole', estimatedCost: 1.50, isOptional: false, substitutes: ['five spice'] },
      { name: 'fish sauce', quantity: '3', unit: 'tbsp', estimatedCost: 1.00, isOptional: false, substitutes: ['soy sauce'] },
      { name: 'bean sprouts', quantity: '200', unit: 'g', estimatedCost: 2.50, isOptional: true, substitutes: [] },
      { name: 'fresh herbs', quantity: '1', unit: 'bunch mixed', estimatedCost: 4.00, isOptional: false, substitutes: [] }
    ],
    instructions: [
      'Char onion and ginger over open flame or under grill until fragrant',
      'Bring stock to boil, add charred vegetables and star anise',
      'Add chicken thighs and simmer for 25 minutes until tender',
      'Remove chicken, shred when cool, strain and return broth to pot',
      'Season broth with fish sauce and sugar to taste',
      'Cook rice noodles according to package directions',
      'Divide noodles between bowls, top with shredded chicken',
      'Ladle hot broth over and serve with herbs and bean sprouts'
    ],
    nutritionalInfo: {
      calories: 420,
      protein: 35,
      carbohydrates: 45,
      fat: 12,
      fiber: 3,
      sugar: 6,
      sodium: 1200,
      vitamins: ['Vitamin B6', 'Niacin', 'Vitamin C'],
      minerals: ['Iron', 'Zinc', 'Selenium']
    },
    estimatedCostPerServing: 7.63,
    healthBenefits: [
      'Comforting and hydrating',
      'Rich in protein and B vitamins',
      'Anti-inflammatory ginger and herbs',
      'Supports immune system'
    ],
    cookingTips: [
      'Charring vegetables adds authentic smoky flavor',
      'Skim foam from broth for clearer soup',
      'Serve garnishes on the side for customization'
    ],
    tags: ['vietnamese', 'soup', 'comfort-food', 'gluten-free', 'family-friendly'],
    dessert: {
      name: 'Vietnamese Coffee',
      description: 'Strong Vietnamese coffee with condensed milk',
      ingredients: ['vietnamese coffee', 'condensed milk', 'ice']
    }
  },
  {
    id: '5',
    mealType: 'Dinner',
    name: 'Mexican-Style Black Bean Quesadillas',
    cuisineType: 'Mexican',
    description: 'Crispy whole wheat tortillas filled with seasoned black beans, cheese, and vegetables. A budget-friendly, protein-rich meal that\'s perfect for busy weeknights.',
    prepTime: 15,
    cookingTime: 20,
    totalTime: 35,
    servings: 4,
    difficulty: 'Beginner',
    ingredients: [
      { name: 'black beans', quantity: '2', unit: 'cans (400g each)', estimatedCost: 3.60, isOptional: false, substitutes: ['kidney beans'] },
      { name: 'whole wheat tortillas', quantity: '8', unit: 'large', estimatedCost: 4.50, isOptional: false, substitutes: ['corn tortillas'] },
      { name: 'cheese', quantity: '200', unit: 'g grated', estimatedCost: 6.00, isOptional: false, substitutes: ['vegan cheese'] },
      { name: 'red capsicum', quantity: '1', unit: 'large', estimatedCost: 2.50, isOptional: false, substitutes: ['yellow capsicum'] },
      { name: 'red onion', quantity: '1', unit: 'medium', estimatedCost: 1.50, isOptional: false, substitutes: ['white onion'] },
      { name: 'cumin', quantity: '1', unit: 'tsp', estimatedCost: 0.20, isOptional: false, substitutes: [] },
      { name: 'paprika', quantity: '1', unit: 'tsp', estimatedCost: 0.20, isOptional: false, substitutes: [] },
      { name: 'olive oil', quantity: '2', unit: 'tbsp', estimatedCost: 0.50, isOptional: false, substitutes: [] },
      { name: 'avocado', quantity: '1', unit: 'large', estimatedCost: 2.50, isOptional: true, substitutes: [] }
    ],
    instructions: [
      'Drain and rinse black beans, mash lightly with fork',
      'Dice capsicum and onion finely',
      'Heat 1 tbsp oil in pan, sauté vegetables until soft',
      'Add mashed beans, cumin, paprika, salt and pepper',
      'Cook for 5 minutes until mixture thickens',
      'Spread bean mixture on half of each tortilla',
      'Top with cheese and fold tortillas over',
      'Cook quesadillas in dry pan for 2-3 minutes each side until crispy',
      'Serve with sliced avocado and salsa'
    ],
    nutritionalInfo: {
      calories: 380,
      protein: 18,
      carbohydrates: 48,
      fat: 14,
      fiber: 12,
      sugar: 6,
      sodium: 680,
      vitamins: ['Folate', 'Vitamin C', 'Vitamin K'],
      minerals: ['Iron', 'Magnesium', 'Potassium']
    },
    estimatedCostPerServing: 5.23,
    healthBenefits: [
      'High in plant-based protein and fiber',
      'Rich in folate and iron',
      'Heart-healthy monounsaturated fats',
      'Budget-friendly complete meal'
    ],
    cookingTips: [
      'Don\'t overfill quesadillas or they\'ll be messy',
      'Use a pizza cutter to slice into triangles',
      'Make extra bean mixture for meal prep'
    ],
    tags: ['mexican', 'vegetarian', 'budget-friendly', 'family-friendly', 'quick'],
    dessert: {
      name: 'Mexican Flan',
      description: 'Creamy caramel flan with vanilla',
      ingredients: ['eggs', 'milk', 'sugar', 'vanilla']
    }
  }
];

class MealDatabase {
  private meals: Meal[] = sampleMeals;

  // Get all meals
  getAllMeals(): Meal[] {
    return this.meals;
  }

  // Get meal by ID
  getMealById(id: string): Meal | undefined {
    return this.meals.find(meal => meal.id === id);
  }

  // Search meals by name or tags
  searchMeals(query: string): Meal[] {
    const searchTerm = query.toLowerCase();
    return this.meals.filter(meal => 
      meal.name.toLowerCase().includes(searchTerm) ||
      meal.description.toLowerCase().includes(searchTerm) ||
      meal.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Filter meals by cuisine type
  getMealsByCuisine(cuisineType: string): Meal[] {
    return this.meals.filter(meal => meal.cuisineType === cuisineType);
  }

  // Filter meals by difficulty
  getMealsByDifficulty(difficulty: string): Meal[] {
    return this.meals.filter(meal => meal.difficulty === difficulty);
  }

  // Filter meals by cooking time
  getMealsByTime(maxTime: number): Meal[] {
    return this.meals.filter(meal => meal.totalTime <= maxTime);
  }

  // Filter meals by cost
  getMealsByCost(maxCost: number): Meal[] {
    return this.meals.filter(meal => meal.estimatedCostPerServing <= maxCost);
  }

  // Get random meals
  getRandomMeals(count: number): Meal[] {
    const shuffled = [...this.meals].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, this.meals.length));
  }



  // Add new meal (for future functionality)
  addMeal(meal: Meal): void {
    this.meals.push(meal);
  }

  // Update existing meal
  updateMeal(id: string, updatedMeal: Partial<Meal>): boolean {
    const index = this.meals.findIndex(meal => meal.id === id);
    if (index !== -1) {
      this.meals[index] = { ...this.meals[index], ...updatedMeal };
      return true;
    }
    return false;
  }

  // Delete meal
  deleteMeal(id: string): boolean {
    const index = this.meals.findIndex(meal => meal.id === id);
    if (index !== -1) {
      this.meals.splice(index, 1);
      return true;
    }
    return false;
  }

  // Get nutritional summary for multiple meals
  getNutritionalSummary(mealIds: string[]) {
    const meals = mealIds.map(id => this.getMealById(id)).filter(Boolean) as Meal[];
    
    return meals.reduce((summary, meal) => ({
      calories: summary.calories + meal.nutritionalInfo.calories,
      protein: summary.protein + meal.nutritionalInfo.protein,
      carbohydrates: summary.carbohydrates + meal.nutritionalInfo.carbohydrates,
      fat: summary.fat + meal.nutritionalInfo.fat,
      fiber: summary.fiber + meal.nutritionalInfo.fiber,
      sugar: summary.sugar + meal.nutritionalInfo.sugar,
      sodium: summary.sodium + meal.nutritionalInfo.sodium
    }), {
      calories: 0, protein: 0, carbohydrates: 0, fat: 0,
      fiber: 0, sugar: 0, sodium: 0
    });
  }
}

export const mealDatabase = new MealDatabase();
export default mealDatabase; 