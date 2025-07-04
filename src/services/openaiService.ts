import { MealPlanRequest, Meal, AIGenerationProgress, MealGenerationResponse } from '../types';

// Check if OpenAI API key is available
const getOpenAIKey = (): string | null => {
  return localStorage.getItem('openai_api_key') || null;
};

// Real implementation with OpenAI API calls using fetch
class OpenAIService {
  async generateMealPlan(
    _request: MealPlanRequest, 
    onProgress?: (progress: AIGenerationProgress) => void
  ): Promise<MealGenerationResponse> {
    const apiKey = getOpenAIKey();
    
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please add your API key in settings to use AI features.');
    }

    // Simulate progress updates
    if (onProgress) {
      onProgress({ stage: 'analyzing', message: 'Analyzing your preferences...', progress: 20 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onProgress({ stage: 'finding', message: 'Finding meal suggestions...', progress: 50 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onProgress({ stage: 'optimizing', message: 'Optimizing nutrition and budget...', progress: 80 });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      onProgress({ stage: 'finalizing', message: 'Meal plan ready!', progress: 100 });
    }

    try {
      const prompt = `Generate a meal plan for 1 day with EXACTLY 3 meals: Breakfast, Lunch, and Dinner. Each meal MUST include a dessert. Respond ONLY with valid JSON (no markdown, no code blocks). Use this structure:
{
  "meals": [
    {
      "mealType": "Breakfast|Lunch|Dinner",
      "name": "...",
      "description": "...",
      "ingredients": [
        { "name": "...", "quantity": "...", "unit": "..." }
      ],
      "instructions": ["...", "..."],
      "dessert": { "name": "...", "description": "...", "ingredients": ["..."] }
    }
  ],
  "planSummary": "..."
}
All meals must be practical, use Australian ingredients, and be achievable for a home cook. Do not include any extra text.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [
            {
              role: 'system',
              content: 'You are a professional nutritionist and chef specializing in creating personalized meal plans. You MUST generate the exact number of meals requested and always respond with valid JSON that matches the exact structure requested. Do not skip any meals or days. Do NOT wrap your response in code blocks or markdown.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error?.message || 'Unknown error';
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorMessage}`);
      }

      const data = await response.json();
      const responseText = data.choices?.[0]?.message?.content;
      
      if (!responseText) {
        throw new Error('No response from OpenAI');
      }

      // Remove code block markers if present
      let cleanResponse = responseText.trim();
      if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```[a-zA-Z]*\n/, '').replace(/```$/, '').trim();
      }

      // Helper: Map any AI meal object to strict Meal type
      function mapToStrictMeal(meal: any, index: number): Meal {
        const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
        const fallbackType = mealTypes[index] || 'Breakfast';
        return {
          id: meal.id || `${fallbackType.toLowerCase()}_${index}`,
          mealType: meal.mealType || fallbackType,
          name: meal.name || fallbackType,
          cuisineType: meal.cuisineType || 'Australian',
          description: meal.description || '',
          cookingTime: meal.cookingTime || 10,
          prepTime: meal.prepTime || 5,
          totalTime: meal.totalTime || ((meal.cookingTime || 10) + (meal.prepTime || 5)),
          servings: meal.servings || 2,
          difficulty: meal.difficulty || 'Beginner',
          ingredients: Array.isArray(meal.ingredients) ? meal.ingredients.map((ing: any, i: number) => ({
            name: ing.name || `Ingredient ${i+1}`,
            quantity: ing.quantity || '1',
            unit: ing.unit || '',
            estimatedCost: ing.estimatedCost || 1,
            isOptional: ing.isOptional || false,
            substitutes: ing.substitutes || []
          })) : [],
          instructions: Array.isArray(meal.instructions) ? meal.instructions : (meal.preparation ? [meal.preparation] : []),
          nutritionalInfo: meal.nutritionalInfo || {
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
          estimatedCostPerServing: meal.estimatedCostPerServing || 5,
          healthBenefits: meal.healthBenefits || [],
          cookingTips: meal.cookingTips || [],
          tags: meal.tags || [],
          dessert: meal.dessert && typeof meal.dessert === 'object' ? {
            name: meal.dessert.name || 'Dessert',
            description: meal.dessert.description || '',
            ingredients: Array.isArray(meal.dessert.ingredients) ? meal.dessert.ingredients : []
          } : {
            name: typeof meal.dessert === 'string' ? meal.dessert : 'Dessert',
            description: '',
            ingredients: []
          },
          imageUrl: meal.imageUrl || ''
        };
      }

      // Try to parse the JSON response
      try {
        const parsedResponse = JSON.parse(cleanResponse);
        // If meals exist, map them to strict type
        if (parsedResponse.meals && Array.isArray(parsedResponse.meals)) {
          parsedResponse.meals = parsedResponse.meals.map(mapToStrictMeal);
        }
        return parsedResponse as MealGenerationResponse;
      } catch (parseError) {
        // Robust fallback: Try to extract up to 3 valid meal objects from the 'meals' array
        const mealsArrayStart = cleanResponse.indexOf('"meals"');
        if (mealsArrayStart !== -1) {
          const mealsBracketStart = cleanResponse.indexOf('[', mealsArrayStart);
          if (mealsBracketStart !== -1) {
            // Find up to 3 top-level { ... } objects inside the array
            const mealsArrayText = cleanResponse.slice(mealsBracketStart);
            const mealObjects = [];
            let depth = 0, startIdx = -1;
            for (let i = 0; i < mealsArrayText.length && mealObjects.length < 3; i++) {
              if (mealsArrayText[i] === '{') {
                if (depth === 0) startIdx = i;
                depth++;
              } else if (mealsArrayText[i] === '}') {
                depth--;
                if (depth === 0 && startIdx !== -1) {
                  const objText = mealsArrayText.slice(startIdx, i + 1);
                  try {
                    const meal = mapToStrictMeal(JSON.parse(objText), mealObjects.length);
                    mealObjects.push(meal);
                  } catch (e) {
                    // skip invalid objects
                  }
                  startIdx = -1;
                }
              } else if (mealsArrayText[i] === ']') {
                break;
              }
            }
            if (mealObjects.length > 0) {
              return {
                meals: mealObjects,
                totalCost: 0,
                nutritionalSummary: {},
                planSummary: '⚠️ Incomplete meal plan: Showing up to 3 available meals only.',
                healthInsights: ['⚠️ Incomplete meal plan: Showing up to 3 available meals only.']
              } as MealGenerationResponse;
            }
          }
        }
        console.error('Failed to parse OpenAI response:', responseText);
        throw new Error('Invalid response format from AI service');
      }

    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error(`AI service error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async customizeMealWithChat(meal: Meal, messages: Array<{ role: string; content: string }>): Promise<string> {
    const apiKey = getOpenAIKey();
    
    if (!apiKey) {
      return `I can help you customize "${meal.name}"! Here are some suggestions:

• **Vegetarian version**: Replace meat with tofu or tempeh
• **Lower carb**: Use cauliflower rice instead of regular rice
• **Spicier**: Add chili flakes or hot sauce
• **Budget-friendly**: Use seasonal vegetables and bulk grains

What specific changes would you like to make?

*Note: Add your OpenAI API key in settings for AI-powered customization.*`;
    }

    try {
      const systemPrompt = `You are a helpful cooking assistant. The user wants to customize a meal called "${meal.name}". 
      
Current meal details:
- Description: ${meal.description}
- Ingredients: ${meal.ingredients.map(i => `${i.name} (${i.quantity} ${i.unit})`).join(', ')}
- Instructions: ${meal.instructions.join('; ')}

Provide helpful suggestions for customization based on the user's request. Be specific and practical.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error?.message || 'Unknown error';
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorMessage}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    } catch (error) {
      console.error('OpenAI chat error:', error);
      return 'Sorry, there was an error with the AI service. Please try again.';
    }
  }

  async customizeMenuWithChat(messages: Array<{ role: string; content: string }>): Promise<string> {
    const apiKey = getOpenAIKey();
    
    if (!apiKey) {
      return `I'd be happy to help you customize your meal plan! Based on your preferences, I can:

• Adjust portion sizes for different dietary needs
• Suggest ingredient substitutions
• Modify cooking methods
• Add or remove specific ingredients
• Optimize for your budget

What would you like to change about your meal plan?

*Note: Add your OpenAI API key in settings for AI-powered customization.*`;
    }

    try {
      const systemPrompt = `You are a helpful meal planning assistant. Help users customize their meal plans based on their preferences and requirements. Provide practical, actionable advice.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4.1-nano',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error?.message || 'Unknown error';
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorMessage}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    } catch (error) {
      console.error('OpenAI chat error:', error);
      return 'Sorry, there was an error with the AI service. Please try again.';
    }
  }

  // Method to check if API key is configured
  isApiKeyConfigured(): boolean {
    return getOpenAIKey() !== null;
  }

  // Method to set API key
  setApiKey(apiKey: string): void {
    localStorage.setItem('openai_api_key', apiKey);
  }

  // Method to remove API key
  removeApiKey(): void {
    localStorage.removeItem('openai_api_key');
  }
}

const openaiService = new OpenAIService();
export default openaiService; 