import { ChefHat } from "lucide-react";


interface Meal {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
}

interface MealSuggestionsProps {
  meals: Meal[];
  isLoading: boolean;
}

export function MealSuggestions({ meals, isLoading }: MealSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-gray-600" />
            Loading Suggestions...
          </h2>
        </div>
        <div className="p-4">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!meals.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-gray-600" />
            Meal Suggestions
          </h2>
        </div>
        <div className="p-4 text-center text-gray-500">
          Add ingredients and click "Get Meal Suggestions" to see what you can
          make!
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800 flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-gray-600" />
          Suggested Meals
        </h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-[calc(100vh-16rem)]  overflow-y-auto">
        {meals.map((meal) => (
          <div key={meal.id} className="p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-900">{meal.name}</h3>
            <div className="mt-1 text-sm text-gray-500 whitespace-pre-line">
              {meal.description}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {meal.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
