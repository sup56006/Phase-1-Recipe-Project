import React from "react";

const RecipeSpecs = ({ recipe, goBack, enlist, like, remove }) => {
  return (
    <div>
      <button onClick={goBack}>Back</button>
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} />
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

export default RecipeSpecs;
