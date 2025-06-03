import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Model.css";
interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    additional_ingredients: string[];
    instructions: string;
    image_url: string;
  }
export function RecipePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const recipe = state as Recipe;

  if (!recipe) return <div>No recipe data provided.</div>;

  return (
    <div className="recipe-page">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{recipe.title}</h1>
      <img src={recipe.image_url} alt={recipe.title} />
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
      {recipe.additional_ingredients.length > 0 && (
        <>
          <h3>Additional Ingredients</h3>
          <ul>
            {recipe.additional_ingredients.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </>
      )}
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
    </div>
  );
}
