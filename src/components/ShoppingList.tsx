
import { Check, ShoppingCart, Package } from 'lucide-react';
import { ShoppingListItem } from '../types';
import { Meal } from '../types';

interface ShoppingListProps {
  items: ShoppingListItem[];
  onItemToggle: (itemId: string) => void;
  meals: Meal[];
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onItemToggle, meals }) => {

  // Group items by meal
  const itemsByMeal: Record<string, ShoppingListItem[]> = {};
  meals.forEach(meal => {
    itemsByMeal[meal.id] = items.filter(item => item.mealIds.includes(meal.id));
  });

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (items.length === 0) {
    return (
      <div className="card text-center">
        <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Shopping List Yet
        </h3>
        <p className="text-gray-600">
          Generate a meal plan to create your shopping list automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Shopping List</h2>
          <p className="text-sm text-gray-600">
            {completedCount} of {totalCount} items completed
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Shopping List Items Grouped by Meal */}
      <div className="space-y-6">
        {meals.map(meal => (
          <div key={meal.id} className="mb-4">
            <div className="flex items-center mb-2">
              <Package className="h-4 w-4 text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-900">{meal.mealType}: {meal.name}</h3>
            </div>
            <div className="ml-6 space-y-1">
              {itemsByMeal[meal.id] && itemsByMeal[meal.id].length > 0 ? (
                itemsByMeal[meal.id].map(item => (
                  <ShoppingListItemComponent
                    key={item.id}
                    item={item}
                    onToggle={() => onItemToggle(item.id)}
                  />
                ))
              ) : (
                <div className="text-gray-400 text-sm">No ingredients for this meal.</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalCount === 0 && (
        <div className="text-center py-8 text-gray-500">
          No items in the shopping list.
        </div>
      )}
    </div>
  );
};

interface ShoppingListItemComponentProps {
  item: ShoppingListItem;
  onToggle: () => void;
}

const ShoppingListItemComponent: React.FC<ShoppingListItemComponentProps> = ({ 
  item, 
  onToggle 
}) => {
  // Build Coles and Woolworths search URLs
  const colesUrl = `https://www.coles.com.au/search/products?q=${encodeURIComponent(item.name)}`;
  const woolworthsUrl = `https://www.woolworths.com.au/shop/search/products?searchTerm=${encodeURIComponent(item.name)}`;
  return (
    <div
      className={`flex items-center p-2 rounded-lg border cursor-pointer transition-all ${
        item.checked
          ? 'bg-green-50 border-green-200 text-green-800'
          : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onToggle}
    >
      <div className={`mr-3 p-1 rounded-full ${
        item.checked ? 'bg-green-500' : 'bg-gray-200'
      }`}>
        <Check className={`h-3 w-3 ${
          item.checked ? 'text-white' : 'text-transparent'
        }`} />
      </div>
      
      <div className="flex-1 flex items-center gap-2">
        <div className={`font-medium ${
          item.checked ? 'line-through' : ''
        }`}>
          {item.name}
        </div>
        {/* Coles and Woolworths links */}
        <a href={colesUrl} target="_blank" rel="noopener noreferrer" title="Search on Coles" className="text-red-600 hover:underline text-xs">Coles</a>
        <a href={woolworthsUrl} target="_blank" rel="noopener noreferrer" title="Search on Woolworths" className="text-green-700 hover:underline text-xs">Woolworths</a>
      </div>
      {item.quantity && (
        <div className="text-sm text-gray-500 ml-2">
          {item.quantity}
        </div>
      )}
    </div>
  );
};

export default ShoppingList; 