import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { DropZone, Draggable } from "../dnd";
import { Trash2, GripVertical, ChefHat } from "lucide-react";

import "../../styles/Model.css";

interface Block {
  id: string;
  type: string;
  category: string;
  label: string;
  color: string;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  additional_ingredients: string[];
  instructions: string;
  image_url: string;
}

// API URLs

const SEARCH_RECIPES_URL = "http://localhost:8000/api/recipes/search/";

export function Canvas() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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

      let newBlocks;
      if (typeof index === "number") {
        newBlocks = [
          ...blocks.slice(0, index),
          newBlock,
          ...blocks.slice(index),
        ];
      } else {
        newBlocks = [...blocks, newBlock];
      }
      setBlocks(newBlocks);
    } else if (sourceContainerId === "canvas") {
      const newBlocks = [...blocks];
      const blockIndex = newBlocks.findIndex((b) => b.id === item.id);
      if (blockIndex === -1) return;

      const [movedBlock] = newBlocks.splice(blockIndex, 1);
      const targetIndex = typeof index === "number" ? index : newBlocks.length;
      newBlocks.splice(targetIndex, 0, movedBlock);

      setBlocks(newBlocks);
    }
  };

  const handleDelete = (blockId: string) => {
    const newBlocks = blocks.filter((block) => block.id !== blockId);
    setBlocks(newBlocks);
  };

  const handleSuggest = async () => {
    if (blocks.length === 0) return;
    setShowHamsterLoader(true); 
    const MIN_LOADING_TIME = 3000; // ⏱ Minimum time to show loader (in ms)
    const startTime = Date.now();
    
    
    try {
      const ingredientNames = blocks.map((block) => block.label);
      const response = await axios.post(SEARCH_RECIPES_URL, {
        ingredients: ingredientNames,
      });
      setRecipes(response.data.recipes);
    } catch (error: any) {
      console.error("Error searching recipes:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to search recipes. Please try again.";
      alert(errorMessage);
      setRecipes([]);
    } finally {
      const elapsedTime = Date.now() - startTime;
      const delay = Math.max(0, MIN_LOADING_TIME - elapsedTime);
  
      setTimeout(() => {
        setShowHamsterLoader(false); // hide after enforced delay
      },delay)
    }
  };

  const navigate = useNavigate();
  const [showHamsterLoader, setShowHamsterLoader] = useState(false);


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
        </div>
        <button
          className={`model-get-suggestions-button-container ${
            blocks.length === 0
              ? "model-get-suggestions-button-disabled"
              : "model-get-suggestions-button-available"
          }`}
          onClick={handleSuggest}
          disabled={blocks.length === 0 || isLoading}
        >
          <ChefHat className="model-chefHat-icon" />
          Suggest
        </button>

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
            className={`DZ-element ${
              blocks.length === 0 ? "full-height" : "min-height"
            }`}
            highlightClassName="model-drag-drop-palace-highlight"
          >
            {blocks.length === 0 && (
              <div className="model-title1">
                Drag food items here to start building your menu
              </div>
            )}
          </DropZone>
        </div>
        {/* Suggest Button */}
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          {/* <button
            className={`model-get-suggestions-button-container ${
              blocks.length === 0
                ? "model-get-suggestions-button-disabled"
                : "model-get-suggestions-button-available"
            }`}
            onClick={handleSuggest}
            disabled={blocks.length === 0 || isLoading}
          >
            <ChefHat className="model-chefHat-icon" />
            Suggest
          </button> */}
        </div>
      </div>

      {/* Recipe Results */}
      {showHamsterLoader ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
	<div className="wheel"></div>
	<div className="hamster">
		<div className="hamster__body">
			<div className="hamster__head">
				<div className="hamster__ear"></div>
				<div className="hamster__eye"></div>
				<div className="hamster__nose"></div>
			</div>
			<div className="hamster__limb hamster__limb--fr"></div>
			<div className="hamster__limb hamster__limb--fl"></div>
			<div className="hamster__limb hamster__limb--br"></div>
			<div className="hamster__limb hamster__limb--bl"></div>
			<div className="hamster__tail"></div>
		</div>
	</div>
	<div className="spoke"></div>
</div>
</div>
      ) : recipes.length > 0 ? (
        <div className="model-recipes-container">
          <h2 className="model-title3">Matching Recipes</h2>
          <div className="model-recipes-grid">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="model-recipe-card"
                onClick={() =>
                  navigate(`/recipe/${recipe.id}`, { state: recipe })
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="model-recipe-image"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="model-recipe-content">
                  <h3 className="model-recipe-title">{recipe.title}</h3>
                  <div className="model-recipe-details">
                    <h4>Ingredients:</h4>
                    <ul>
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>

                    <></>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : blocks.length > 0 ? (
        <div className="model-no-recipes">
          No recipes found for the selected ingredients
        </div>
      ) : null}
    </div>
  );
}
