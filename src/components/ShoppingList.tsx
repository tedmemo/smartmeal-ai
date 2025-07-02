import { useState } from 'react';
import { Check, ShoppingCart, Package } from 'lucide-react';
import { ShoppingListItem } from '../types';

interface ShoppingListProps {
  items: ShoppingListItem[];
  onItemToggle: (itemId: string) => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ items, onItemToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Group items by category
  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingListItem[]>);

  const categories = ['All', ...Object.keys(itemsByCategory)];
  const filteredItems = selectedCategory === 'All' 
    ? items 
    : itemsByCategory[selectedCategory] || [];

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

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
            {category !== 'All' && (
              <span className="ml-1 text-xs opacity-75">
                ({itemsByCategory[category]?.length || 0})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Shopping List Items */}
      <div className="space-y-2">
        {selectedCategory === 'All' ? (
          // Show items grouped by category
          Object.entries(itemsByCategory).map(([category, categoryItems]) => (
            <div key={category} className="mb-4">
              <div className="flex items-center mb-2">
                <Package className="h-4 w-4 text-gray-500 mr-2" />
                <h3 className="font-medium text-gray-900">{category}</h3>
                <span className="ml-2 text-xs text-gray-500">
                  ({categoryItems.length} items)
                </span>
              </div>
              <div className="ml-6 space-y-1">
                {categoryItems.map(item => (
                  <ShoppingListItemComponent
                    key={item.id}
                    item={item}
                    onToggle={() => onItemToggle(item.id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          // Show filtered items
          <div className="space-y-1">
            {filteredItems.map(item => (
              <ShoppingListItemComponent
                key={item.id}
                item={item}
                onToggle={() => onItemToggle(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {filteredItems.length === 0 && selectedCategory !== 'All' && (
        <div className="text-center py-8 text-gray-500">
          No items in the {selectedCategory} category.
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
      
      <div className="flex-1">
        <div className={`font-medium ${
          item.checked ? 'line-through' : ''
        }`}>
          {item.name}
        </div>
        {item.quantity && (
          <div className="text-sm text-gray-500">
            {item.quantity}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingList; 