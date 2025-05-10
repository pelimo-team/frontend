import React, { useState } from "react";
import {
  Beef,
  Carrot,
  Apple,
  Cookie,
  ChevronDown,
  Milk,
  Coffee,
  IceCream,
} from "lucide-react";
import { Draggable } from "../dnd";
import "../../styles/Model.css"
interface Block {
  id: string;
  type: string;
  category: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const blocks: Block[] = [
  // Meat Category
  {
    id: "meat-steak",
    type: "food",
    category: "Meat",
    label: "Steak",
    icon: <Beef className="ingredient-siza" />,
    color: "meat-color",
  },

  {
    id: "meat-chicken",
    type: "food",
    category: "Meat",
    label: "Chicken",
    icon: <Beef className="ingredient-siza" />,
    color: "meat-color",
  },
  {
    id: "meat-fish",
    type: "food",
    category: "Meat",
    label: "Fish",
    icon: <Beef className="ingredient-siza" />,
    color: "meat-color",
  },

  // Vegetables Category
  {
    id: "veg-carrot",
    type: "food",
    category: "Vegetables",
    label: "Carrot",
    icon: <Carrot className="ingredient-siza" />,
    color: "vegetable-color",
  },
  {
    id: "veg-broccoli",
    type: "food",
    category: "Vegetables",
    label: "Broccoli",
    icon: <Carrot className="ingredient-siza" />,
    color: "vegetable-color",
  },
  {
    id: "veg-tomato",
    type: "food",
    category: "Vegetables",
    label: "Tomato",
    icon: <Carrot className="ingredient-siza" />,
    color: "vegetable-color",
  },

  // Fruit Category
  {
    id: "fruit-apple",
    type: "food",
    category: "Fruit",
    label: "Apple",
    icon: <Apple className="ingredient-siza" />,
    color: "fruit-color",
  },
  {
    id: "fruit-banana",
    type: "food",
    category: "Fruit",
    label: "Banana",
    icon: <Apple className="ingredient-siza" />,
    color: "fruit-color",
  },
  {
    id: "fruit-orange",
    type: "food",
    category: "Fruit",
    label: "Orange",
    icon: <Apple className="ingredient-siza" />,
    color: "fruit-color",
  },

  // Bread Category
  {
    id: "bread-white",
    type: "food",
    category: "Bread",
    label: "White Bread",
    icon: <Cookie className="ingredient-siza" />,
    color: "bread-color",
  },
  {
    id: "bread-wheat",
    type: "food",
    category: "Bread",
    label: "Wheat Bread",
    icon: <Cookie className="ingredient-siza" />,
    color: "bread-color",
  },
  {
    id: "bread-baguette",
    type: "food",
    category: "Bread",
    label: "Baguette",
    icon: <Cookie className="ingredient-siza" />,
    color: "bread-color",
  },

  // Dairy Category
  {
    id: "dairy-milk",
    type: "food",
    category: "Dairy",
    label: "Milk",
    icon: <Milk className="ingredient-siza" />,
    color: "dairy-color",
  },
  {
    id: "dairy-cheese",
    type: "food",
    category: "Dairy",
    label: "Cheese",
    icon: <Milk className="ingredient-siza" />,
    color: "dairy-color",
  },
  {
    id: "dairy-yogurt",
    type: "food",
    category: "Dairy",
    label: "Yogurt",
    icon: <Milk className="ingredient-siza" />,
    color: "dairy-color",
  },

  // Beverages Category
  {
    id: "beverage-coffee",
    type: "food",
    category: "Beverages",
    label: "Coffee",
    icon: <Coffee className="ingredient-siza" />,
    color: "beverage-color",
  },
  {
    id: "beverage-tea",
    type: "food",
    category: "Beverages",
    label: "Tea",
    icon: <Coffee className="ingredient-siza" />,
    color: "beverage-color",
  },
  {
    id: "beverage-juice",
    type: "food",
    category: "Beverages",
    label: "Juice",
    icon: <Coffee className="ingredient-siza" />,
    color: "beverage-color",
  },

  // Desserts Category
  {
    id: "dessert-icecream",
    type: "food",
    category: "Desserts",
    label: "Ice Cream",
    icon: <IceCream className="ingredient-siza" />,
    color: "dessert-color",
  },
  {
    id: "dessert-cake",
    type: "food",
    category: "Desserts",
    label: "Cake",
    icon: <IceCream className="ingredient-siza" />,
    color: "dessert-color",
  },
  {
    id: "dessert-pudding",
    type: "food",
    category: "Desserts",
    label: "Pudding",
    icon: <IceCream className="ingredient-siza" />,
    color: "dessert-color",
  },
];

const categories = [
  "Meat",
  "Vegetables",
  "Fruit",
  "Bread",
  "Dairy",
  "Beverages",
  "Desserts",
];

export function BlockPalette() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories)
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };
  //text-white rounded-lg shadow-sm p-3 flex items-center gap-2
  return (
    <div className="model-food-item-container">
      <div className="model-food-item-header">
        <h2 className="model-item-food-header-text">Food Items</h2>
      </div>

      <div className="model-food-item-scroll">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category);
          const categoryBlocks = blocks.filter(
            (block) => block.category === category
          );

          return (
            <div key={category} className="model-category-padding">
              <button
                onClick={() => toggleCategory(category)}
                className="model-category-drop-down"
              >
                <span className="model-category-title">{category}</span>
                <ChevronDown
                  className={`model-food-item-dropdown-arrow ${
                    isExpanded ? "model-rotate-arrow" : ""
                  }`}
                />
              </button>

              {isExpanded && (
                <div className="model-space-top-ingredients   model-space-y-ingredients">
                  {categoryBlocks.map((block) => (
                    <Draggable
                      key={block.id}
                      id={block.id}
                      type="block"
                      data={block}
                      containerId="palette"
                      className={`${block.color} model-ingredient-style`}
                    >
                      {block.icon}
                      <span className="font-medium">{block.label}</span>
                    </Draggable>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
