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
      <div className="model-loading-meal-p1">
        <div className="model-loading-meal-p2">
          <h2 className="model-loading-meal-p3">
            <ChefHat className="model-loading-meal-p4" />
            Loading Suggestions...
          </h2>
        </div>
        <div className="model-loading-meal-p5">
          <div className="model-loading-meal-p6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="model-loading-meal-p7">
                <div className="model-loading-meal-p8"></div>
                <div className="model-loading-meal-p9"></div>
                <div className="model-loading-meal-p10">
                  <div className="model-loading-meal-p11"></div>
                  <div className="model-loading-meal-p12"></div>
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
      
      <div className="model-meal-suggestion-container">
        <div className="model-show-result-container">
          <h2 className="model-meal-suggestion-header">
            <ChefHat className="model-meal-suggestion-header-icon" />
            Meal Suggestions
          </h2>
        </div>
        <div className="model-meal-suggestion-text">
          Add ingredients and click "Get Meal Suggestions" to see what you can
          make!
        </div>
      </div>
    );
  }

  return (
    
    <div className="model-resault-container">
      <div className="model-resault-header-container">
        <h2 className="model-resault-header">
          <ChefHat className="model-resault-header-icon" />
          Suggested Meals
        </h2>
      </div>
      
      <div className="model-resault-box">
        {meals.map((meal) => (
          <div key={meal.id} className="model-resault-box-padding">
            <h3 className="model-resault-box-title">{meal.name}</h3>
            <div className="model-resault-box-body-text">
              {meal.description}
            </div>
            <div className="model-resault-ingredients-wrapper-container">
              {meal.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="model-resault-ingredients-wrapper"
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
