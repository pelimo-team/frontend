import { useState } from "react";
import axios from "axios";
import { DropZone, Draggable } from "../dnd";
import { Trash2, GripVertical, ChefHat } from "lucide-react";
import { MealSuggestions } from "./MealSuggestions";
import "../../styles/Model.css";

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
        parameters: {
          temperature: 0.7,
          max_new_tokens: 2000,
          return_full_text: false,
        },
      });

      // Show the entire suggestion from the backend
      const suggestion = response.data.suggestions.trim();

      let mealName = "AI Suggestion";
      let description = suggestion;

      // Try to extract meal name and description if the format matches
      const mealNameMatch = suggestion.match(/Meal Name:\s*(.*)/i);
      const descriptionMatch = suggestion.match(/Description:\s*([\s\S]*)/i);

      if (mealNameMatch && descriptionMatch) {
        mealName = mealNameMatch[1].trim();
        description = descriptionMatch[1].trim();
      }

      setMeals([
        {
          id: "huggingface",
          name: mealName,
          description: description,
          ingredients: ingredientNames,
        },
      ]);
    } catch (error: any) {
      console.error("Error fetching meal suggestions:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to get meal suggestions. Please try again.";
      alert(errorMessage);
      setMeals([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="model-canvas-container">
      <div className="model-menu-canvas-container">
        <div className="model-get-suggestion-button-position">
          <div>
            <h2 className="model-title3">Menu Canvas</h2>
            <p className="model-title2">
              Drag food items here to build your menu
            </p>
          </div>

          <button
            onClick={handleGetSuggestions}
            disabled={blocks.length === 0}
            className={`model-get-suggestions-button-container
             
              ${
                blocks.length === 0
                  ? "model-get-suggestions-button-disabled"
                  : "model-get-suggestions-button-available"
              }
              transition-colors
            `}
          >
            <ChefHat className="model-chefHat-icon" />
            Get Meal Suggestions
          </button>
        </div>

        <div className="model-drag-place-ingredients">
          {blocks.map((block, index) => (
            <div key={block.id} className="relative">
              <DropZone
                id={`dropzone-${index}`}
                accept={["block"]}
                onDrop={(item, sourceId) => handleDrop(item, sourceId, index)}
                className="py-1"
                highlightClassName="Hl-element"
              >
                <Draggable
                  id={block.id}
                  type="block"
                  data={block}
                  containerId="canvas"
                  className={`${block.color} model-ingredient-label`}
                >
                  <div className="model-category-container">
                    <GripVertical className="model-gray-box-style" />

                    <span className="font-medium">{block.label}</span>
                    <button
                      onClick={() => handleDelete(block.id)}
                      className="model-trash-button"
                    >
                      <Trash2 className="model-trash-icon" />
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
            className={`DZ-element ${blocks.length === 0 ? "full-height" : "min-height"}`}
            highlightClassName="model-drag-drop-palace-highlight"
          >
            {blocks.length === 0 && (
              <div className="model-title1">
                Drag food items here to start building your menu
              </div>
            )}
          </DropZone>
        </div>
      </div>

      <div className="model-meal-suggestions">
        <MealSuggestions meals={meals} isLoading={isLoading} />
      </div>
    </div>
  );
}
