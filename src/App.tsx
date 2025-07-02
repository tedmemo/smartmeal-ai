import { useState } from 'react';
import Header from './components/Header';
import MealPlanForm from './components/MealPlanForm';
import MealCard from './components/MealCard';
import ShoppingList from './components/ShoppingList';
import LoadingAnimation from './components/LoadingAnimation';
import { Meal, MealPlanRequest, ShoppingListItem } from './types';
import { Sparkles, Calendar, ListChecks } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMeals, setCurrentMeals] = useState<Meal[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [activeTab, setActiveTab] = useState<'plan' | 'meals' | 'shopping'>('plan');

  // Mock meal generation (replace with actual AI service later)
  const generateMockMeals = (): Meal[] => {
    return [
      {
        id: '1',
        name: 'Mediterranean Quinoa Bowl',
        description: 'A healthy bowl with quinoa, roasted vegetables, chickpeas, and tahini dressing',
        cookingTime: 25,
        servings: 2,
        difficulty: 'Easy',
        ingredients: ['quinoa', 'chickpeas', 'bell peppers', 'cucumber', 'tahini', 'lemon'],
        instructions: ['Cook quinoa', 'Roast vegetables', 'Mix tahini dressing', 'Combine all ingredients'],
        calories: 420,
        category: 'Lunch',
        tags: ['healthy', 'vegetarian', 'high-protein']
      },
      {
        id: '2',
        name: 'Garlic Herb Salmon',
        description: 'Pan-seared salmon with garlic, herbs, and a side of roasted asparagus',
        cookingTime: 20,
        servings: 2,
        difficulty: 'Medium',
        ingredients: ['salmon fillets', 'garlic', 'herbs', 'asparagus', 'olive oil', 'lemon'],
        instructions: ['Season salmon', 'Heat pan', 'Cook salmon', 'Roast asparagus'],
        calories: 380,
        category: 'Dinner',
        tags: ['seafood', 'low-carb', 'high-protein']
      },
      {
        id: '3',
        name: 'Berry Protein Smoothie',
        description: 'A refreshing smoothie with mixed berries, protein powder, and almond milk',
        cookingTime: 5,
        servings: 1,
        difficulty: 'Easy',
        ingredients: ['mixed berries', 'protein powder', 'almond milk', 'banana', 'honey'],
        instructions: ['Add all ingredients to blender', 'Blend until smooth', 'Serve immediately'],
        calories: 280,
        category: 'Breakfast',
        tags: ['smoothie', 'protein', 'quick']
      }
    ];
  };

  const generateMockShoppingList = (meals: Meal[]): ShoppingListItem[] => {
    const items: ShoppingListItem[] = [];
    let idCounter = 1;

    meals.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        const category = getCategoryForIngredient(ingredient);
        items.push({
          id: (idCounter++).toString(),
          name: ingredient,
          quantity: '1 unit',
          category,
          checked: false
        });
      });
    });

    return items;
  };

  const getCategoryForIngredient = (ingredient: string): string => {
    const categories = {
      'Produce': ['bell peppers', 'cucumber', 'asparagus', 'lemon', 'banana', 'mixed berries'],
      'Protein': ['salmon fillets', 'chickpeas', 'protein powder'],
      'Pantry': ['quinoa', 'tahini', 'olive oil', 'honey', 'garlic', 'herbs'],
      'Dairy': ['almond milk']
    };

    for (const [category, items] of Object.entries(categories)) {
      if (items.some(item => ingredient.toLowerCase().includes(item.toLowerCase()))) {
        return category;
      }
    }
    return 'Other';
  };

  const handleMealPlanSubmit = async (request: MealPlanRequest) => {
    setIsLoading(true);
    
    // Log the request for demonstration (in real app, this would be sent to AI service)
    console.log('Meal plan request:', request);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockMeals = generateMockMeals();
    const mockShoppingList = generateMockShoppingList(mockMeals);
    
    setCurrentMeals(mockMeals);
    setShoppingList(mockShoppingList);
    setIsLoading(false);
    setActiveTab('meals');
  };

  const handleShoppingItemToggle = (itemId: string) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const tabs = [
    { id: 'plan' as const, name: 'Plan', icon: Sparkles },
    { id: 'meals' as const, name: 'Meals', icon: Calendar },
    { id: 'shopping' as const, name: 'Shopping', icon: ListChecks }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg">
            <div className="flex space-x-1">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'plan' && (
            <div>
              {isLoading ? (
                <LoadingAnimation 
                  message="Creating your personalized meal plan..."
                  size="lg"
                />
              ) : (
                <MealPlanForm
                  onSubmit={handleMealPlanSubmit}
                  isLoading={isLoading}
                />
              )}
            </div>
          )}

          {activeTab === 'meals' && (
            <div>
              {currentMeals.length > 0 ? (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold gradient-text mb-2">
                      Your Personalized Meal Plan
                    </h2>
                    <p className="text-gray-600">
                      Here are your recommended meals based on your preferences
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentMeals.map(meal => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        onClick={() => console.log('Meal clicked:', meal.name)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Meal Plan Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first meal plan to see your personalized recommendations here.
                  </p>
                  <button
                    onClick={() => setActiveTab('plan')}
                    className="btn-primary"
                  >
                    Create Meal Plan
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'shopping' && (
            <div className="max-w-2xl mx-auto">
              <ShoppingList
                items={shoppingList}
                onItemToggle={handleShoppingItemToggle}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App; 