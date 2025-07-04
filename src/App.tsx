import { useState } from 'react';
import Header from './components/Header';
import MealPlanForm from './components/MealPlanForm';
import MealCard from './components/MealCard';
import ShoppingList from './components/ShoppingList';
import LoadingAnimation from './components/LoadingAnimation';
import MealDetailModal, { ChatModal } from './components/MealDetailModal';
import Settings from './components/Settings';
import { Meal, MealPlanRequest, ShoppingListItem, AIGenerationProgress, MealGenerationResponse } from './types';
import { Sparkles, Calendar, ListChecks, AlertCircle, RefreshCw, Wifi, WifiOff, Bot } from 'lucide-react';
import openaiService from './services/openaiService';
import mealDatabase from './services/mealDatabase';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMeals, setCurrentMeals] = useState<Meal[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [activeTab, setActiveTab] = useState<'plan' | 'meals' | 'shopping'>('plan');
  const [error, setError] = useState<string | null>(null);
  const [aiProgress, setAiProgress] = useState<AIGenerationProgress | null>(null);
  const [mealPlanSummary, setMealPlanSummary] = useState<string>('');
  const [totalCost, setTotalCost] = useState<number>(0);
  const [healthInsights, setHealthInsights] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customizeMeal, setCustomizeMeal] = useState<Meal | null>(null);
  const [lastRequest, setLastRequest] = useState<MealPlanRequest | null>(null);
  const [previousMeals, setPreviousMeals] = useState<Meal[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showApiBanner, setShowApiBanner] = useState(() => !openaiService.isApiKeyConfigured());

  // Monitor network status
  useState(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  });

  // Enhanced mock meal generation for fallback
  const generateEnhancedMockMeals = (request: MealPlanRequest): Meal[] => {
    const mockMeals = mealDatabase.getRandomMeals(request.duration * request.mealsPerDay);
    
    // Enhance with Australian context and pricing
         return mockMeals.map((meal: Meal, index: number) => ({
      ...meal,
      id: `fallback_${index + 1}`,
             cuisineType: (request.preferences.cuisineTypes[0] || 'Healthy') as Meal['cuisineType'],
      servings: request.preferences.numberOfPeople,
      estimatedCostPerServing: Math.random() * (request.preferences.budgetRange.max - request.preferences.budgetRange.min) + request.preferences.budgetRange.min,
      dietaryGoal: request.preferences.dietaryGoal,
      nutritionalInfo: {
        calories: 350 + Math.floor(Math.random() * 300),
        protein: 20 + Math.floor(Math.random() * 30),
        carbohydrates: 30 + Math.floor(Math.random() * 40),
        fat: 10 + Math.floor(Math.random() * 20),
        fiber: 5 + Math.floor(Math.random() * 15),
        sugar: 5 + Math.floor(Math.random() * 20),
        sodium: 400 + Math.floor(Math.random() * 800),
        vitamins: ['Vitamin C', 'Vitamin B12', 'Vitamin D'],
        minerals: ['Iron', 'Calcium', 'Potassium']
      },
      healthBenefits: [
        'Rich in essential nutrients',
        'Supports immune system',
        'Good source of energy'
      ],
      cookingTips: [
        'Prep ingredients ahead of time',
        'Season to taste',
        'Serve fresh for best flavor'
      ]
    }));
  };

  const generateMockShoppingList = (meals: Meal[]): ShoppingListItem[] => {
    const items: ShoppingListItem[] = [];
    let idCounter = 1;

    meals.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        // Only add if ingredient.name is a non-empty string
        if (!ingredient.name || typeof ingredient.name !== 'string') return;
        const category = getCategoryForIngredient(ingredient.name);
        items.push({
          id: (idCounter++).toString(),
          name: ingredient.name,
          quantity: `${ingredient.quantity} ${ingredient.unit}`,
          category,
          checked: false,
          estimatedCost: ingredient.estimatedCost || Math.random() * 10 + 2,
          mealIds: [meal.id]
        });
      });
    });

    return items;
  };

  const getCategoryForIngredient = (ingredient: string): string => {
    if (!ingredient || typeof ingredient !== 'string') return 'Other';
    const categories = {
      'Produce': ['bell peppers', 'cucumber', 'asparagus', 'lemon', 'banana', 'mixed berries', 'tomato', 'onion', 'garlic'],
      'Protein': ['salmon fillets', 'chickpeas', 'protein powder', 'chicken', 'beef', 'eggs', 'tofu'],
      'Pantry': ['quinoa', 'tahini', 'olive oil', 'honey', 'garlic', 'herbs', 'rice', 'pasta'],
      'Dairy': ['almond milk', 'milk', 'cheese', 'yogurt']
    };

    for (const [category, items] of Object.entries(categories)) {
      if (items.some(item => ingredient.toLowerCase().includes(item.toLowerCase()))) {
        return category;
      }
    }
    return 'Other';
  };

  const handleMealPlanSubmit = async (request: MealPlanRequest) => {
    setLastRequest(request);
    setIsLoading(true);
    setError(null);
    setAiProgress(null);

    // Log the request for demonstration
    console.log('🧠 AI Meal plan request:', request);

    try {
      let response: MealGenerationResponse;

      if (isOnline) {
        // Try AI generation first
        try {
          response = await openaiService.generateMealPlan(request, (progress: AIGenerationProgress) => {
            setAiProgress(progress);
          });
          
          console.log('✅ AI Response received:', response);
          console.log('✅ Meals in response:', response.meals);
          
        } catch (aiError) {
          console.warn(`🔄 ChatGPT generation failed, using enhanced fallback:`, aiError);
          
          // Enhanced fallback with mock data
          const fallbackMeals = generateEnhancedMockMeals(request);
          response = {
            meals: fallbackMeals,
            totalCost: fallbackMeals.reduce((sum, meal) => sum + (meal.estimatedCostPerServing * meal.servings), 0),
            nutritionalSummary: {
              calories: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.calories, 0),
              protein: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.protein, 0),
              carbohydrates: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.carbohydrates, 0),
              fat: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.fat, 0),
              fiber: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.fiber, 0),
              sugar: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.sugar, 0),
              sodium: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.sodium, 0),
              vitamins: ['Multiple vitamins'],
              minerals: ['Multiple minerals']
            },
            planSummary: `Fallback meal plan for ${request.preferences.numberOfPeople} people with ${request.preferences.dietaryGoal.toLowerCase()} goals`,
            healthInsights: [
              'Balanced nutrition across all meals',
              'Variety of cuisines and cooking methods',
              'Budget-conscious ingredient selection'
            ],
            shoppingList: request.generateShoppingList ? generateMockShoppingList(fallbackMeals) : undefined
          };

          if (aiError instanceof Error) {
            if (aiError.message.includes('rate limit')) {
              setError(`AI service temporarily unavailable (rate limit). Using fallback meal plan. Try again later.`);
            } else {
              setError(`AI service error: ${aiError.message}. Using fallback meal plan.`);
            }
          } else {
            setError(`ChatGPT service unavailable. Using fallback meal plan with enhanced features.`);
          }
        }
      } else {
        // Offline mode
        console.warn('📱 Offline mode: Using enhanced local meal database');
        const fallbackMeals = generateEnhancedMockMeals(request);
        response = {
          meals: fallbackMeals,
          totalCost: fallbackMeals.reduce((sum, meal) => sum + (meal.estimatedCostPerServing * meal.servings), 0),
          nutritionalSummary: {
            calories: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.calories, 0),
            protein: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.protein, 0),
            carbohydrates: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.carbohydrates, 0),
            fat: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.fat, 0),
            fiber: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.fiber, 0),
            sugar: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.sugar, 0),
            sodium: fallbackMeals.reduce((sum, meal) => sum + meal.nutritionalInfo.sodium, 0),
            vitamins: ['Multiple vitamins'],
            minerals: ['Multiple minerals']
          },
          planSummary: `Offline meal plan for ${request.preferences.numberOfPeople} people`,
          healthInsights: ['Balanced offline meal selection', 'Local ingredient focus'],
          shoppingList: request.generateShoppingList ? generateMockShoppingList(fallbackMeals) : undefined
        };
        setError('You\'re offline. Using cached meal recommendations.');
      }

      // Set the results
      setCurrentMeals(response.meals);
      setTotalCost(response.totalCost);
      setMealPlanSummary(response.planSummary);
      setHealthInsights(response.healthInsights);
      
      // Always generate shopping list from the meals, regardless of AI response
      const generatedShoppingList = generateMockShoppingList(response.meals);
      console.log('🛒 Generated shopping list:', generatedShoppingList);
      setShoppingList(generatedShoppingList);

      setActiveTab('meals');

    } catch (error: any) {
      console.error('❌ Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setAiProgress(null);
    }
  };

  // Add refresh handler
  const handleRefreshPlan = () => {
    if (lastRequest) {
      // Store current meals as previous meals for comparison
      if (currentMeals.length > 0) {
        setPreviousMeals([...currentMeals]);
        setShowComparison(true);
      }
      // Clear current shopping list to ensure fresh generation
      setShoppingList([]);
      handleMealPlanSubmit(lastRequest);
    }
  };

  const handleShoppingItemToggle = (itemId: string) => {
    setShoppingList(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRetry = () => {
    setError(null);
    setActiveTab('plan');
  };

  // Add handler for opening modal
  const handleMealCardClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  const tabs = [
    { id: 'plan' as const, name: 'Plan', icon: Sparkles },
    { id: 'meals' as const, name: 'Meals', icon: Calendar, badge: currentMeals.length },
    { id: 'shopping' as const, name: 'Shopping', icon: ListChecks, badge: shoppingList.length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* API Key Banner */}
      {showApiBanner && (
        <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-900 px-4 py-3 flex items-center justify-between z-50">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">OpenAI API key not set.</span>
            <span className="hidden sm:inline">Add your API key to enable AI-powered meal planning and customization.</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold px-3 py-1 rounded"
              onClick={() => setIsSettingsOpen(true)}
            >
              Add API Key
            </button>
            <button
              className="ml-2 text-yellow-700 hover:text-yellow-900 text-xl font-bold"
              onClick={() => setShowApiBanner(false)}
              title="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      
      {/* Network Status Indicator */}
      <div className={`fixed top-20 right-4 z-40 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isOnline 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-orange-100 text-orange-800 border border-orange-200'
      }`}>
        {isOnline ? (
          <div className="flex items-center space-x-1">
            <Wifi className="h-4 w-4" />
            <span>Online</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1">
            <WifiOff className="h-4 w-4" />
            <span>Offline</span>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-orange-800 text-sm">{error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-2 flex items-center space-x-1 text-orange-600 hover:text-orange-700 text-sm font-medium"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          </div>
        )}

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
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all relative ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs flex items-center justify-center ${
                        activeTab === tab.id ? 'bg-white text-primary' : 'bg-primary text-white'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
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
                <div className="max-w-2xl mx-auto">
                  <LoadingAnimation 
                    message={aiProgress?.message || "Preparing your AI meal plan..."}
                    size="lg"
                  />
                  {aiProgress && (
                    <div className="mt-6 bg-white rounded-lg p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          {aiProgress.stage.charAt(0).toUpperCase() + aiProgress.stage.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">{aiProgress.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                          style={{ width: `${aiProgress.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{aiProgress.message}</p>
                    </div>
                  )}
                </div>
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
                    <h2 className="text-3xl font-bold gradient-text mb-3">
                      Your AI-Generated Meal Plan
                    </h2>
                    <p className="text-gray-600 text-lg mb-4">
                      {mealPlanSummary}
                    </p>
                    <div className="flex justify-center space-x-6 text-sm">
                      <div className="bg-white px-4 py-2 rounded-lg shadow">
                        <span className="font-semibold text-primary">Total Cost: </span>
                        <span className="font-bold">${(totalCost || currentMeals.reduce((sum, meal) => sum + (meal.estimatedCostPerServing || 0), 0)).toFixed(2)} AUD</span>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-lg shadow">
                        <span className="font-semibold text-accent">Meals: </span>
                        <span className="font-bold">{currentMeals.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Comparison Toggle */}
                  {previousMeals && previousMeals.length > 0 && (
                    <div className="mb-6 text-center">
                      <button
                        onClick={() => setShowComparison(!showComparison)}
                        className="btn-secondary text-sm"
                      >
                        {showComparison ? 'Hide' : 'Show'} Previous Meal Plan Comparison
                      </button>
                    </div>
                  )}

                  {/* Previous Meals Comparison */}
                  {showComparison && previousMeals && previousMeals.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Previous Meal Plan</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {['Breakfast', 'Lunch', 'Dinner'].map(type => {
                          const meal = previousMeals.find(m => m.mealType === type);
                          return meal ? (
                            <div key={`prev-${type}`} className="opacity-60">
                              <h4 className="font-semibold text-gray-600 mb-2">{type}</h4>
                              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h5 className="font-medium text-gray-700">{meal.name}</h5>
                                <p className="text-sm text-gray-500 mt-1">{meal.description}</p>
                                <div className="text-xs text-gray-400 mt-2">
                                  ${meal.estimatedCostPerServing.toFixed(2)} AUD per serving
                                </div>
                              </div>
                            </div>
                          ) : null;
                        })}
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-700 mb-2">Current Meal Plan</h4>
                      </div>
                    </div>
                  )}

                  {/* Health Insights */}
                  {healthInsights && healthInsights.length > 0 && (
                    <div className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Health Insights</h3>
                      <ul className="space-y-2">
                        {healthInsights.map((insight, index) => (
                          <li key={index} className="text-gray-700 flex items-start space-x-2">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex justify-end mb-4">
                    <button
                      onClick={handleRefreshPlan}
                      className="btn-primary flex items-center space-x-2"
                      disabled={isLoading}
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>{isLoading ? 'Refreshing...' : 'Refresh Plan'}</span>
                    </button>
                  </div>
                  {isLoading && aiProgress && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 flex items-center space-x-2">
                      <span>⏳</span>
                      <span>{aiProgress.message} ({aiProgress.progress}%)</span>
                    </div>
                  )}
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 flex items-center space-x-2">
                      <span>❌</span>
                      <span>{error}</span>
                    </div>
                  )}
                  <div className="flex justify-end mb-4">
                    <button
                      className="btn-primary flex items-center space-x-2"
                      onClick={() => setCustomizeMeal({} as Meal)}
                    >
                      <Bot className="h-4 w-4" />
                      <span>Personalize Menu</span>
                    </button>
                  </div>
                  {['Breakfast', 'Lunch', 'Dinner'].map(type => {
                    const meal = currentMeals.find(m => m.mealType === type);
                    return meal ? (
                      <div key={type} className="mb-8">
                        <h2 className="text-xl font-bold mb-2">{type}</h2>
                        <MealCard meal={meal} onClick={handleMealCardClick} onCustomize={setCustomizeMeal} />
                        <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                          <h3 className="font-semibold text-yellow-700 mb-1">Dessert: {meal.dessert.name}</h3>
                          <p className="text-sm text-gray-700 mb-1">{meal.dessert.description}</p>
                          <div className="text-xs text-gray-600">Ingredients: {meal.dessert.ingredients.join(', ')}</div>
                        </div>
                      </div>
                    ) : (
                      <div key={type} className="mb-8">
                        <h2 className="text-xl font-bold mb-2">{type}</h2>
                        <div className="p-6 bg-gray-50 rounded-lg text-gray-400 text-center border border-dashed">No {type} meal found.</div>
                      </div>
                    );
                  })}
                  <ChatModal meal={customizeMeal} isOpen={!!customizeMeal} onClose={() => setCustomizeMeal(null)} onMealUpdate={updatedMeal => {
                    setCurrentMeals(prev => prev.map(m => m.mealType === updatedMeal.mealType ? updatedMeal : m));
                    setCustomizeMeal(null);
                  }} />
                  <MealDetailModal
                    meal={selectedMeal}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                  />
                </div>
              ) : (
                <div className="text-gray-500">No meals found.</div>
              )}
            </div>
          )}

          {activeTab === 'shopping' && (
            <div className="max-w-2xl mx-auto">
              <ShoppingList
                items={shoppingList}
                onItemToggle={handleShoppingItemToggle}
                meals={currentMeals}
              />
            </div>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      <Settings 
        isOpen={isSettingsOpen} 
        onClose={() => {
          setIsSettingsOpen(false);
          setShowApiBanner(!openaiService.isApiKeyConfigured());
        }} 
      />
    </div>
  );
}

export default App; 