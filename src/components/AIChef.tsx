import { useState, useRef, useEffect } from 'react';
import { ChefHat, MessageCircle, Search, Plus, X, Bot, ShoppingCart, CheckCircle } from 'lucide-react';
import { Meal, ShoppingListItem } from '../types';
import openaiService from '../services/openaiService';
import LoadingAnimation from './LoadingAnimation';

interface AIChefProps {
  onMealGenerated?: (meal: Meal, shoppingList: ShoppingListItem[]) => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChef: React.FC<AIChefProps> = ({ onMealGenerated }) => {
  const [mode, setMode] = useState<'ingredients' | 'chat'>('ingredients');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedMeal, setGeneratedMeal] = useState<Meal | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [showFinalMeal, setShowFinalMeal] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (mode === 'chat' && chatMessages.length === 0) {
      setChatMessages([
        {
          role: 'assistant',
          content: "👨‍🍳 Hi! I'm your AI Chef. Let's create something delicious together! What kind of meal are you thinking about? I can suggest ideas, help with ingredients, or create a complete recipe with shopping list.",
          timestamp: new Date()
        }
      ]);
    }
  }, [mode, chatMessages.length]);

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const generateMealFromIngredients = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    try {
      const prompt = `I have these ingredients: ${ingredients.join(', ')}. 
      Please suggest 3 different meal ideas I could make with these ingredients. 
      For each idea, provide:
      1. A creative meal name
      2. Brief description
      3. What additional ingredients I might need
      4. Estimated cooking time
      
      Format as a numbered list.`;

      const response = await openaiService.customizeMenuWithChat([
        { role: 'user', content: prompt }
      ]);

      setChatMessages([
        {
          role: 'assistant',
          content: response,
          timestamp: new Date()
        }
      ]);

      setMode('chat');
    } catch (error) {
      console.error('Error generating meal ideas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      let response: string;

      // Check if user wants to generate final meal
      if (chatInput.toLowerCase().includes('generate') || 
          chatInput.toLowerCase().includes('create') || 
          chatInput.toLowerCase().includes('make') ||
          chatInput.toLowerCase().includes('recipe')) {
        
        response = await openaiService.customizeMenuWithChat([
          ...chatMessages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: chatInput + "\n\nPlease generate a complete recipe with ingredients, instructions, and nutritional info. Format as JSON." }
        ]);

        // Try to parse the response as a meal
        try {
          const parsed = JSON.parse(response);
          if (parsed.name && parsed.ingredients) {
            const meal: Meal = {
              id: `ai_chef_${Date.now()}`,
              mealType: 'Dinner',
              name: parsed.name,
              cuisineType: parsed.cuisineType || 'International',
              description: parsed.description || '',
              cookingTime: parsed.cookingTime || 30,
              prepTime: parsed.prepTime || 15,
              totalTime: parsed.totalTime || 45,
              servings: parsed.servings || 2,
              difficulty: parsed.difficulty || 'Intermediate',
              ingredients: parsed.ingredients.map((ing: any, i: number) => ({
                name: ing.name || `Ingredient ${i+1}`,
                quantity: ing.quantity || '1',
                unit: ing.unit || '',
                estimatedCost: ing.estimatedCost || 2,
                isOptional: ing.isOptional || false,
                substitutes: ing.substitutes || []
              })),
              instructions: parsed.instructions || [],
              nutritionalInfo: parsed.nutritionalInfo || {
                calories: 400,
                protein: 20,
                carbohydrates: 40,
                fat: 10,
                fiber: 5,
                sugar: 5,
                sodium: 300,
                vitamins: [],
                minerals: []
              },
              estimatedCostPerServing: parsed.estimatedCostPerServing || 8,
              healthBenefits: parsed.healthBenefits || [],
              cookingTips: parsed.cookingTips || [],
              tags: parsed.tags || [],
              dessert: {
                name: 'Simple Dessert',
                description: 'A light dessert to complement your meal',
                ingredients: ['Fresh fruit', 'Honey']
              },
              imageUrl: ''
            };

            setGeneratedMeal(meal);
            
            // Generate shopping list
            const shoppingItems: ShoppingListItem[] = meal.ingredients.map((ing, i) => ({
              id: i.toString(),
              name: ing.name,
              quantity: `${ing.quantity} ${ing.unit}`,
              category: getCategoryForIngredient(ing.name),
              checked: false,
              estimatedCost: ing.estimatedCost || 2,
              mealIds: [meal.id]
            }));

            setShoppingList(shoppingItems);
            setShowFinalMeal(true);
          }
        } catch (parseError) {
          console.log('Could not parse as meal, treating as regular response');
        }
      } else {
        response = await openaiService.customizeMenuWithChat([
          ...chatMessages.map(msg => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: chatInput }
        ]);
      }

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryForIngredient = (ingredient: string): string => {
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

  const handleAcceptMeal = () => {
    if (generatedMeal && onMealGenerated) {
      onMealGenerated(generatedMeal, shoppingList);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Mode Selection */}
      <div className="mb-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setMode('ingredients')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              mode === 'ingredients' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Search className="h-4 w-4" />
            <span>What Can I Cook?</span>
          </button>
          <button
            onClick={() => setMode('chat')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              mode === 'chat' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span>AI Chef Chat</span>
          </button>
        </div>
      </div>

      {/* Ingredients Mode */}
      {mode === 'ingredients' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              What Can I Cook?
            </h2>
            <p className="text-gray-600">
              Tell me what ingredients you have, and I'll suggest delicious meals you can make!
            </p>
          </div>

          {/* Ingredient Input */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Your Ingredients</h3>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                placeholder="Add an ingredient (e.g., chicken, rice, tomatoes)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={addIngredient}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Ingredients List */}
            {ingredients.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">Added Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      <span>{ingredient}</span>
                      <button
                        onClick={() => removeIngredient(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={generateMealFromIngredients}
              disabled={ingredients.length === 0 || isLoading}
              className="mt-4 w-full btn-primary flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <LoadingAnimation size="sm" />
                  <span>Generating Ideas...</span>
                </>
              ) : (
                <>
                  <ChefHat className="h-4 w-4" />
                  <span>Get Meal Ideas</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Chat Mode */}
      {mode === 'chat' && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              AI Chef Chat
            </h2>
            <p className="text-gray-600">
              Chat with your AI chef to brainstorm meal ideas and create recipes!
            </p>
          </div>

          {/* Chat Messages */}
          <div className="bg-white rounded-lg shadow-lg h-96 overflow-y-auto p-4">
            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 animate-pulse" />
                      <span>AI Chef is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
              placeholder="Ask about meal ideas, ingredients, or say 'generate recipe' to create a complete meal..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              onClick={sendChatMessage}
              disabled={!chatInput.trim() || isLoading}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Generated Meal Modal */}
      {showFinalMeal && generatedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Your Generated Meal</h3>
                <button
                  onClick={() => setShowFinalMeal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">{generatedMeal.name}</h4>
                  <p className="text-blue-700">{generatedMeal.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Shopping List
                  </h4>
                  <div className="space-y-2">
                    {shoppingList.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{item.name}</span>
                        <span className="text-xs text-gray-500">{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAcceptMeal}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Accept & Add to Plan</span>
                  </button>
                  <button
                    onClick={() => setShowFinalMeal(false)}
                    className="flex-1 btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChef; 