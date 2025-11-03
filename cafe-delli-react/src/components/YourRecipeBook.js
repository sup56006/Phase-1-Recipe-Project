import React from "react";

const YourRecipeBook = ({ recipes, release, like, remove }) => {
  return (
    <div>
      <h2>Your Recipe Book</h2>
      <div className="recipe-collection enlisted">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} />
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Likes:</strong> {recipe.likes}</p>
            <div>
              <button onClick={() => release(recipe)}>Release</button>
              <button onClick={() => like(recipe)}>👍 Like</button>
              <button onClick={() => remove(recipe)} style={{ background: "red" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourRecipeBook;
