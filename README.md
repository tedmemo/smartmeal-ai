# SmartMeal AI - Intelligent Meal Planning App

A modern React TypeScript application that uses Google Gemini AI to generate personalized meal plans with Australian context, pricing, and nutritional information.

## 🧠 AI-Powered Features

- **Google Gemini AI Integration**: Intelligent meal plan generation
- **Australian Context**: Local ingredients, pricing in AUD, and seasonal availability
- **Personalized Nutrition**: Custom meal plans based on dietary goals and preferences
- **Smart Shopping Lists**: Automatically generated with cost estimates and categorization
- **Offline Fallback**: Enhanced local meal database when AI is unavailable
- **Progressive Loading**: Real-time progress indicators during AI generation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Gemini AI API key ([Get one here](https://makersuite.google.com/app/apikey))

### Environment Setup

1. **Clone and install dependencies:**
```bash
git clone https://github.com/tedmemo/smartmeal-ai.git
cd smartmeal-ai
npm install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

3. **Start the development server:**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the app.

## 🔧 AI Configuration

### Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file as `VITE_GEMINI_API_KEY`

### API Features

- **Intelligent Prompting**: Context-aware meal generation with Australian pricing
- **Rate Limiting**: Built-in request throttling to manage API quota
- **Error Handling**: Graceful fallback to enhanced local database
- **Progress Tracking**: Real-time generation status updates
- **Cost Optimization**: Smart ingredient selection within budget constraints

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

## 🏗️ Technical Architecture

### Core Technologies
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: Google Generative AI SDK
- **Icons**: Lucide React
- **State Management**: React Hooks

### AI Service Architecture
```typescript
class GeminiService {
  // Advanced prompt engineering for Australian context
  // Rate limiting and error handling
  // Response parsing and validation
  // Fallback mechanisms
}
```

### Type Safety
```typescript
interface Meal {
  // Comprehensive meal structure
  // Australian pricing and nutrition
  // Enhanced ingredient details
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
├── services/        # API and data services
├── types/          # TypeScript interfaces
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

### Intelligent Response Parsing
- JSON validation and sanitization
- Nutritional calculation verification
- Cost estimation accuracy
- Recipe authenticity checks

## 🔒 Privacy & Security

- **API Key Security**: Environment variable protection
- **No Data Storage**: Client-side only processing
- **Rate Limiting**: Prevents API abuse
- **Error Logging**: No sensitive data in logs

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Set `VITE_GEMINI_API_KEY` in your deployment platform:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment Variables
- **Docker**: Use `.env` file or environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your changes with proper TypeScript types
4. Test the AI integration thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini AI**: For powerful meal generation capabilities
- **React Team**: For the excellent development framework
- **Tailwind CSS**: For the beautiful design system
- **Lucide**: For the comprehensive icon library

---

**Built with ❤️ for the SmartMeal AI community**

*Bringing AI-powered nutrition planning to Australian kitchens* 