# SmartMeal AI - Intelligent Meal Planning App

![image](https://github.com/user-attachments/assets/76f13a69-093b-46ac-89e4-f68264a7c933)

A modern React TypeScript application that uses OpenAI GPT-4o-nano to generate personalized meal plans with Australian context, pricing, and nutritional information.

## 🧠 AI-Powered Features

- **OpenAI GPT-4o-nano Integration**: Fast and cost-effective meal plan generation
- **Australian Context**: Local ingredients, pricing in AUD, and seasonal availability
- **Personalized Nutrition**: Custom meal plans based on dietary goals and preferences
- **Smart Shopping Lists**: Automatically generated with cost estimates and categorization
- **Offline Fallback**: Enhanced local meal database when AI is unavailable
- **Progressive Loading**: Real-time progress indicators during AI generation
- **AI Chat Integration**: Customize meals and get cooking advice through chat
- **Robust Error Handling**: Graceful fallback for incomplete AI responses

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Environment Setup

1. **Clone and install dependencies:**
```bash
git clone https://github.com/tedmemo/smartmeal-ai.git
cd smartmeal-ai
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

3. **Add your OpenAI API key:**
   - Click the Settings (gear) icon in the top-right corner
   - Paste your OpenAI API key and save
   - Your key is stored securely in your browser only

## 🔧 AI Configuration

### OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add it through the app's Settings modal (no environment variables needed)

### API Features

- **GPT-4o-nano Model**: Fast, cost-effective meal generation
- **Intelligent Prompting**: Context-aware meal generation with Australian pricing
- **Rate Limiting**: Built-in request throttling to manage API quota
- **Error Handling**: Graceful fallback to enhanced local database
- **Progress Tracking**: Real-time generation status updates
- **Cost Optimization**: Smart ingredient selection within budget constraints
- **Robust Parsing**: Handles truncated or malformed AI responses

## 🍽️ Meal Planning Features

### Dietary Goals
- **Weight Loss**: High-protein, controlled-calorie meals
- **Muscle Building**: Protein-optimized with post-workout recovery options
- **Family Nutrition**: Kid-friendly, balanced meals for all ages
- **Budget-Friendly**: Affordable staples and value-focused ingredients

### Cuisine Types
- Vietnamese, Mexican, Italian, Mediterranean
- Healthy, Asian, Australian, Indian
- Authentic recipes adapted for Australian kitchens

### Smart Preferences
- **Dietary Restrictions**: Vegetarian, Vegan, Gluten-Free, Keto, Paleo, etc.
- **Allergies**: Comprehensive allergy management
- **Cooking Skills**: Beginner to Advanced recipe complexity
- **Time Constraints**: 15-120 minutes daily cooking time
- **Budget Range**: $10-50 AUD per person per day
- **Kitchen Equipment**: Customized recipes based on available tools

## 🛒 Shopping List Features

- **Smart Categorization**: Organized by supermarket sections
- **Cost Estimation**: Australian pricing with running totals
- **Meal Mapping**: See which meals each ingredient supports
- **Progress Tracking**: Check off items as you shop
- **Quantity Optimization**: Bulk buying suggestions
- **Direct Links**: Quick access to Coles and Woolworths product searches

## 💬 AI Chat Features

- **Meal Customization**: Modify existing meals through chat
- **Cooking Advice**: Get tips and substitutions
- **Dietary Modifications**: Request vegetarian, gluten-free, or other variations
- **Budget Optimization**: Ask for cost-saving alternatives
- **Interactive Planning**: Real-time meal plan adjustments

## 🏗️ Technical Architecture

### Core Technologies
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: OpenAI API with fetch-based implementation
- **Icons**: Lucide React
- **State Management**: React Hooks

### AI Service Architecture
```typescript
class OpenAIService {
  // Browser-compatible fetch implementation
  // Advanced prompt engineering for Australian context
  // Rate limiting and error handling
  // Response parsing and validation
  // Fallback mechanisms for incomplete responses
}
```

### Type Safety
```typescript
interface Meal {
  // Comprehensive meal structure
  // Australian pricing and nutrition
  // Enhanced ingredient details
  // Dessert integration
}

interface MealGenerationResponse {
  // AI response validation
  // Shopping list generation
  // Health insights
}
```

## 📱 User Experience

### Progressive Web App Features
- **Responsive Design**: Mobile-first approach
- **Offline Support**: Cached meal recommendations
- **Network Status**: Online/offline indicators
- **Loading States**: Professional progress animations
- **Error Recovery**: User-friendly error messages with retry options

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Clear focus indicators

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # TypeScript and ESLint checks
npm run type-check   # TypeScript compilation check
```

### Project Structure
```
src/
├── components/      # React components
│   ├── Header.tsx
│   ├── MealCard.tsx
│   ├── MealDetailModal.tsx
│   ├── MealPlanForm.tsx
│   ├── Settings.tsx
│   ├── ShoppingList.tsx
│   └── LoadingAnimation.tsx
├── services/        # API and data services
│   ├── openaiService.ts
│   └── mealDatabase.ts
├── types/          # TypeScript interfaces
│   └── index.ts
├── App.tsx         # Main application
└── main.tsx        # Entry point
```

## 🌟 AI Prompt Engineering

The app uses sophisticated prompt engineering to generate high-quality meal plans:

### Context-Aware Prompts
- Australian ingredient availability and pricing
- Seasonal produce considerations
- Local supermarket context (Woolworths/Coles)
- Metric measurements and Australian terminology
- Structured JSON output for reliable parsing

### Intelligent Response Parsing
- JSON validation and sanitization
- Nutritional calculation verification
- Cost estimation accuracy
- Recipe authenticity checks
- Fallback parsing for truncated responses

## 🔒 Privacy & Security

- **API Key Security**: Browser-based storage (localStorage)
- **No Data Storage**: Client-side only processing
- **Rate Limiting**: Prevents API abuse
- **Error Logging**: No sensitive data in logs
- **Secure Implementation**: No API keys in codebase

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Platforms
- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Static site hosting
- **Docker**: Containerized deployment

### Environment Variables
**No environment variables needed!** The app uses browser-based API key storage for security.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes with proper TypeScript types
4. Test the AI integration thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **OpenAI**: For powerful GPT-4o-nano meal generation capabilities
- **React Team**: For the excellent development framework
- **Tailwind CSS**: For the beautiful design system
- **Lucide**: For the comprehensive icon library
- **Vite**: For the fast build tooling

## 🔑 Adding Your OpenAI API Key

This app uses **browser-based API key storage** for maximum security. No API key is included in the codebase.

### How to Add Your API Key

1. **Deploy or run the app** (locally or on Vercel).
2. **Click the Settings (gear) icon** in the top-right corner, or use the yellow banner at the top if prompted.
3. **Paste your OpenAI API key** in the modal and save.
4. Your key is stored **only in your browser** (localStorage) and is never sent to any server or included in the code.
5. You can remove or update your key at any time from the same Settings modal.

> **Tip:** You can get your OpenAI API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### Why This is Secure
- No API key is ever committed to the repo or sent to a server.
- Each user controls their own key in their browser.
- Safe for public forks, deployment, and open source use.
- Perfect for open-source projects and public repositories.

---

**Built with ❤️ for the SmartMeal AI community**

*Bringing AI-powered nutrition planning to Australian kitchens* 
