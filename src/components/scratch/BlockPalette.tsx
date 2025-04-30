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
    icon: <Beef className="w-5 h-5" />,
    color: "bg-red-600",
  },
  {
    id: "meat-chicken",
    type: "food",
    category: "Meat",
    label: "Chicken",
    icon: <Beef className="w-5 h-5" />,
    color: "bg-red-600",
  },
  {
    id: "meat-fish",
    type: "food",
    category: "Meat",
    label: "Fish",
    icon: <Beef className="w-5 h-5" />,
    color: "bg-red-600",
  },

  // Vegetables Category
  {
    id: "veg-carrot",
    type: "food",
    category: "Vegetables",
    label: "Carrot",
    icon: <Carrot className="w-5 h-5" />,
    color: "bg-green-600",
  },
  {
    id: "veg-broccoli",
    type: "food",
    category: "Vegetables",
    label: "Broccoli",
    icon: <Carrot className="w-5 h-5" />,
    color: "bg-green-600",
  },
  {
    id: "veg-tomato",
    type: "food",
    category: "Vegetables",
    label: "Tomato",
    icon: <Carrot className="w-5 h-5" />,
    color: "bg-green-600",
  },

  // Fruit Category
  {
    id: "fruit-apple",
    type: "food",
    category: "Fruit",
    label: "Apple",
    icon: <Apple className="w-5 h-5" />,
    color: "bg-orange-500",
  },
  {
    id: "fruit-banana",
    type: "food",
    category: "Fruit",
    label: "Banana",
    icon: <Apple className="w-5 h-5" />,
    color: "bg-orange-500",
  },
  {
    id: "fruit-orange",
    type: "food",
    category: "Fruit",
    label: "Orange",
    icon: <Apple className="w-5 h-5" />,
    color: "bg-orange-500",
  },

  // Bread Category
  {
    id: "bread-white",
    type: "food",
    category: "Bread",
    label: "White Bread",
    icon: <Cookie className="w-5 h-5" />,
    color: "bg-yellow-600",
  },
  {
    id: "bread-wheat",
    type: "food",
    category: "Bread",
    label: "Wheat Bread",
    icon: <Cookie className="w-5 h-5" />,
    color: "bg-yellow-600",
  },
  {
    id: "bread-baguette",
    type: "food",
    category: "Bread",
    label: "Baguette",
    icon: <Cookie className="w-5 h-5" />,
    color: "bg-yellow-600",
  },

  // Dairy Category
  {
    id: "dairy-milk",
    type: "food",
    category: "Dairy",
    label: "Milk",
    icon: <Milk className="w-5 h-5" />,
    color: "bg-blue-500",
  },
  {
    id: "dairy-cheese",
    type: "food",
    category: "Dairy",
    label: "Cheese",
    icon: <Milk className="w-5 h-5" />,
    color: "bg-blue-500",
  },
  {
    id: "dairy-yogurt",
    type: "food",
    category: "Dairy",
    label: "Yogurt",
    icon: <Milk className="w-5 h-5" />,
    color: "bg-blue-500",
  },

  // Beverages Category
  {
    id: "beverage-coffee",
    type: "food",
    category: "Beverages",
    label: "Coffee",
    icon: <Coffee className="w-5 h-5" />,
    color: "bg-yellow-500",
  },
  {
    id: "beverage-tea",
    type: "food",
    category: "Beverages",
    label: "Tea",
    icon: <Coffee className="w-5 h-5" />,
    color: "bg-yellow-500",
  },
  {
    id: "beverage-juice",
    type: "food",
    category: "Beverages",
    label: "Juice",
    icon: <Coffee className="w-5 h-5" />,
    color: "bg-yellow-500",
  },

  // Desserts Category
  {
    id: "dessert-icecream",
    type: "food",
    category: "Desserts",
    label: "Ice Cream",
    icon: <IceCream className="w-5 h-5" />,
    color: "bg-pink-500",
  },
  {
    id: "dessert-cake",
    type: "food",
    category: "Desserts",
    label: "Cake",
    icon: <IceCream className="w-5 h-5" />,
    color: "bg-pink-500",
  },
  {
    id: "dessert-pudding",
    type: "food",
    category: "Desserts",
    label: "Pudding",
    icon: <IceCream className="w-5 h-5" />,
    color: "bg-pink-500",
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

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <h2 className="font-semibold text-gray-800">Food Items</h2>
      </div>

      <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category);
          const categoryBlocks = blocks.filter(
            (block) => block.category === category
          );

          return (
            <div key={category} className="p-4">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {category === "Meat" && <Beef className="w-5 h-5" />}
                  {category === "Vegetables" && <Carrot className="w-5 h-5" />}
                  {category === "Fruit" && <Apple className="w-5 h-5" />}
                  {category === "Bread" && <Cookie className="w-5 h-5" />}
                  {category === "Dairy" && <Milk className="w-5 h-5" />}
                  {category === "Beverages" && <Coffee className="w-5 h-5" />}
                  {category === "Desserts" && <IceCream className="w-5 h-5" />}
                  <span>{category}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isExpanded ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`space-y-2 overflow-hidden transition-all duration-200 ${
                  isExpanded ? "max-h-[500px] mt-3" : "max-h-0"
                }`}
              >
                {categoryBlocks.map((block) => (
                  <Draggable
                    key={block.id}
                    id={block.id}
                    type="block"
                    data={block}
                    containerId="palette"
                    className={`${block.color} text-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="p-3 flex items-center gap-2">
                      {block.icon}
                      <span className="font-medium">{block.label}</span>
                    </div>
                  </Draggable>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
