import React from "react";

const RecipeCard = ({ recipe, selectRecipe, enlist, like, remove }) => {
  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>
      <img
        src={recipe.image}
        alt={recipe.name}
        onClick={() => selectRecipe(recipe)}
        style={{ cursor: "pointer" }}
      />
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Likes:</strong> {recipe.likes}</p>
      <div>
        <button onClick={() => enlist(recipe)}>Enlist</button>
        <button onClick={() => like(recipe)}>👍 Like</button>
        <button onClick={() => remove(recipe)} style={{ background: "red" }}>Delete</button>
      </div>
    </div>
  );
};

export default RecipeCard;
