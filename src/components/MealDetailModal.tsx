import { X, Clock, Users, ChefHat, DollarSign, Heart, Lightbulb, Star, Award, ShoppingCart } from 'lucide-react';
import { Meal } from '../types';
import React, { useState, useRef, useEffect } from 'react';
import openaiService from '../services/openaiService';

interface MealDetailModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MealDetailModal: React.FC<MealDetailModalProps> = ({ meal, isOpen, onClose }) => {
  if (!isOpen || !meal) return null;

  const totalCost = meal.estimatedCostPerServing * meal.servings;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{meal.name}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            {/* Description */}
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {meal.description}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{meal.totalTime}</div>
                <div className="text-sm text-blue-700">Minutes Total</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{meal.servings}</div>
                <div className="text-sm text-green-700">Servings</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">${totalCost.toFixed(2)}</div>
                <div className="text-sm text-orange-700">Total Cost AUD</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">{meal.nutritionalInfo.calories}</div>
                <div className="text-sm text-purple-700">Calories</div>
              </div>
            </div>

            {/* Difficulty and Goal */}
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full border bg-gray-100 text-gray-700">
              <ChefHat className="h-5 w-5" />
              <span className="font-medium">{meal.difficulty} Level</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Ingredients & Instructions */}
              <div className="space-y-6">
                {/* Ingredients */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                    Ingredients ({meal.ingredients.length})
                  </h3>
                  <div className="space-y-3">
                    {meal.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{ingredient.name}</div>
                          <div className="text-sm text-gray-600">
                            {ingredient.quantity} {ingredient.unit}
                            {ingredient.isOptional && <span className="text-orange-600 ml-2">(Optional)</span>}
                          </div>
                          {ingredient.substitutes && ingredient.substitutes.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              Substitutes: {ingredient.substitutes.join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            ${(ingredient.estimatedCost || 0).toFixed(2)}
                          </div>
                          <div className="text-xs text-gray-500">AUD</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    👨‍🍳 Instructions
                  </h3>
                  <div className="space-y-3">
                    {meal.instructions.map((instruction, index) => (
                      <div key={index} className="flex space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-0.5">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Nutrition & Tips */}
              <div className="space-y-6">
                {/* Nutrition Facts */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    📊 Nutrition Facts (per serving)
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-primary">{meal.nutritionalInfo.calories}</div>
                        <div className="text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{meal.nutritionalInfo.protein}g</div>
                        <div className="text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{meal.nutritionalInfo.carbohydrates}g</div>
                        <div className="text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{meal.nutritionalInfo.fat}g</div>
                        <div className="text-sm text-gray-600">Fat</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{meal.nutritionalInfo.fiber}g</div>
                        <div className="text-sm text-gray-600">Fiber</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{meal.nutritionalInfo.sodium}mg</div>
                        <div className="text-sm text-gray-600">Sodium</div>
                      </div>
                    </div>
                    
                    {/* Vitamins and Minerals */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {meal.nutritionalInfo.vitamins && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Rich in Vitamins:</h4>
                            <div className="flex flex-wrap gap-1">
                              {meal.nutritionalInfo.vitamins.map((vitamin, index) => (
                                <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  {vitamin}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {meal.nutritionalInfo.minerals && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Rich in Minerals:</h4>
                            <div className="flex flex-wrap gap-1">
                              {meal.nutritionalInfo.minerals.map((mineral, index) => (
                                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {mineral}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Benefits */}
                {meal.healthBenefits && meal.healthBenefits.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-green-500" />
                      Health Benefits
                    </h3>
                    <div className="space-y-2">
                      {meal.healthBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-green-800">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cooking Tips */}
                {meal.cookingTips && meal.cookingTips.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                      Pro Cooking Tips
                    </h3>
                    <div className="space-y-2">
                      {meal.cookingTips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-yellow-50 rounded-lg">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-yellow-800">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Time Breakdown */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    ⏱️ Time Breakdown
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{meal.prepTime}m</div>
                      <div className="text-sm text-blue-700">Prep Time</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-lg font-bold text-orange-600">{meal.cookingTime}m</div>
                      <div className="text-sm text-orange-700">Cook Time</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{meal.totalTime}m</div>
                      <div className="text-sm text-green-700">Total Time</div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    🏷️ Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {meal.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Cost per serving: <span className="font-bold text-gray-900">${meal.estimatedCostPerServing.toFixed(2)} AUD</span>
              </div>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChatModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
  onMealUpdate?: (updatedMeal: Meal) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ meal, isOpen, onClose, onMealUpdate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (meal && meal.name) {
        setMessages([
          { role: 'assistant', content: `How would you like to customize "${meal.name}"? You can ask for substitutions, dietary changes, or improvements!` }
        ]);
      } else {
        setMessages([
          { role: 'assistant', content: `How would you like to personalize your menu? You can request dietary changes, add more protein, make it vegetarian, or ask for budget-friendly options!` }
        ]);
      }
      setInput('');
    }
  }, [isOpen, meal]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    try {
      let aiResponse = '';
      if (meal && meal.name) {
        aiResponse = await openaiService.customizeMealWithChat(meal, messages.concat(userMsg));
        // Try to parse a Meal object from the response
        try {
          const parsed = JSON.parse(aiResponse);
          if (parsed && parsed.name && parsed.mealType) {
            onMealUpdate?.(parsed);
          }
        } catch {}
      } else {
        aiResponse = await openaiService.customizeMenuWithChat(messages.concat(userMsg));
      }
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong with the AI. Please try again.' }]);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">
            {meal && meal.name ? `Customize: ${meal.name}` : 'Personalize Menu'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-primary">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto mb-2 max-h-80 border rounded p-2 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}> 
              <span className={`inline-block px-3 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>{msg.content}</span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex items-center gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="E.g. Make this vegetarian, add more protein..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
            disabled={isLoading}
          />
          <button
            className="btn-primary px-4 py-2 rounded"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealDetailModal;
export { ChatModal }; 