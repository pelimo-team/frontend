import { useState } from "react";
import axios from "axios";
import { DropZone, Draggable } from "../dnd";
import { Trash2, GripVertical, ChefHat } from "lucide-react";
import { MealSuggestions } from "./MealSuggestions";

interface Block {
  id: string;
  type: string;
  category: string;
  label: string;
  color: string;
}

interface Meal {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  matchScore?: number;
  matchedIngredients?: number[];
  missingIngredients?: number[];
}

// Mock API URL - Replace with your actual API endpoint later
const API_URL = "http://localhost:8000/api/suggest-meals/";

export function Canvas() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrop = (
    item: any,
    sourceContainerId: string | null,
    index?: number
  ) => {
    if (sourceContainerId === "palette") {
      const newBlock = {
        ...item.data,
        id: `${item.data.id}-${Date.now()}`,
      };

      if (typeof index === "number") {
        setBlocks((prev) => [
          ...prev.slice(0, index),
          newBlock,
          ...prev.slice(index),
        ]);
      } else {
        setBlocks((prev) => [...prev, newBlock]);
      }
    } else if (sourceContainerId === "canvas") {
      setBlocks((prev) => {
        const newBlocks = [...prev];
        const blockIndex = newBlocks.findIndex((b) => b.id === item.id);
        if (blockIndex === -1) return prev;

        const [movedBlock] = newBlocks.splice(blockIndex, 1);
        const targetIndex =
          typeof index === "number" ? index : newBlocks.length;
        newBlocks.splice(targetIndex, 0, movedBlock);

        return newBlocks;
      });
    }
  };

  const handleDelete = (blockId: string) => {
    setBlocks((prev) => prev.filter((block) => block.id !== blockId));
  };

  const handleGetSuggestions = async () => {
    if (blocks.length === 0) {
      alert("Please add some ingredients first!");
      return;
    }

    setIsLoading(true);
    try {
      const ingredientNames = blocks.map((block) => block.label);

      const response = await axios.post(API_URL, {
        ingredient_names: ingredientNames,
      });

      // The backend now returns { suggestions: text }
      setMeals([
        {
          id: "huggingface",
          name: "AI Suggestions",
          description: response.data.suggestions,
          ingredients: ingredientNames,
        },
      ]);
    } catch (error) {
      console.error("Error fetching meal suggestions:", error);
      alert("Failed to get meal suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-8 flex-1 p-6">
      <div className="flex-1 bg-white rounded-lg shadow-sm p-6 min-h-[600px]">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-gray-800">Menu Canvas</h2>
            <p className="text-sm text-gray-500">
              Drag food items here to build your menu
            </p>
          </div>
          <button
            onClick={handleGetSuggestions}
            disabled={blocks.length === 0}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-white
              ${
                blocks.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }
              transition-colors
            `}
          >
            <ChefHat className="w-5 h-5" />
            Get Meal Suggestions
          </button>
        </div>

        <div className="min-h-[500px] bg-gray-50 rounded-lg p-4 overflow-y-auto max-h-[600px]">
          {blocks.map((block, index) => (
            <div key={block.id} className="relative">
              <DropZone
                id={`dropzone-${index}`}
                accept={["block"]}
                onDrop={(item, sourceId) => handleDrop(item, sourceId, index)}
                className="py-1"
                highlightClassName="before:content-[''] before:h-0.5 before:bg-blue-500 before:absolute before:left-4 before:right-4 before:-top-1"
              >
                <Draggable
                  id={block.id}
                  type="block"
                  data={block}
                  containerId="canvas"
                  className={`${block.color} text-white rounded-lg shadow-sm group relative`}
                >
                  <div className="p-3 flex items-center gap-2">
                    <GripVertical className="w-5 h-5 text-white/70 cursor-grab" />
                    <span className="font-medium">{block.label}</span>
                    <button
                      onClick={() => handleDelete(block.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </Draggable>
              </DropZone>
            </div>
          ))}

          <DropZone
            id="dropzone-final"
            accept={["block"]}
            onDrop={(item, sourceId) => handleDrop(item, sourceId)}
            className={`${
              blocks.length === 0 ? "h-full" : "min-h-[100px]"
            } rounded-lg`}
            highlightClassName="bg-blue-50 border-2 border-dashed border-blue-300"
          >
            {blocks.length === 0 && (
              <div className="h-full flex items-center justify-center text-gray-400">
                Drag food items here to start building your menu
              </div>
            )}
          </DropZone>
        </div>
      </div>

      <div className="w-[34rem] pl-4">
        <MealSuggestions meals={meals} isLoading={isLoading} />
      </div>
    </div>
  );
}
