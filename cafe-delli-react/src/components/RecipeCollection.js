import React from "react";
import RecipeCard from "./RecipeCard";

const RecipeCollection = ({ recipes, selectRecipe, enlist, like, remove, filterCategory, setFilterCategory }) => {
  const categories = ["all", ...new Set(recipes.map(r => r.category))];

  const filteredRecipes = recipes.filter(r =>
    filterCategory === "all" || r.category === filterCategory
  );

  return (
    <div>
      <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <div className="recipe-collection">
        {filteredRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            selectRecipe={selectRecipe}
            enlist={enlist}
            like={like}
            remove={remove}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeCollection;
