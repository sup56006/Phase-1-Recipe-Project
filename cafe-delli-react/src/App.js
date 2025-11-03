import React, { useEffect, useState } from "react";
import RecipeCollection from "./components/RecipeCollection";
import YourRecipeBook from "./components/YourRecipeBook";
import RecipeSpecs from "./components/RecipeSpecs";
import { fetchRecipes, updateLikes, deleteRecipe } from "./api";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [yourRecipes, setYourRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch(err => console.error("Failed to fetch recipes:", err));
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(savedTheme === "true");
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  const enlistRecipe = (recipe) => {
    if (yourRecipes.find(r => r.category === recipe.category)) {
      alert(`You can only enlist one recipe from "${recipe.category}" category`);
      return;
    }
    setYourRecipes([...yourRecipes, recipe]);
  };

  const releaseRecipe = (recipe) => {
    setYourRecipes(yourRecipes.filter(r => r.id !== recipe.id));
  };

  const likeRecipe = async (recipe) => {
    const updated = await updateLikes(recipe.id, recipe.likes + 1);
    setRecipes(recipes.map(r => r.id === recipe.id ? updated : r));
    setYourRecipes(yourRecipes.map(r => r.id === recipe.id ? updated : r));
  };

  const removeRecipe = async (recipe) => {
    await deleteRecipe(recipe.id);
    setRecipes(recipes.filter(r => r.id !== recipe.id));
    setYourRecipes(yourRecipes.filter(r => r.id !== recipe.id));
  };

  return (
    <div className="App">
      <header>
        <h1>🍴 Cafe Delli Recipe Book</h1>
        <button onClick={toggleTheme}>
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </header>

      {selectedRecipe ? (
        <RecipeSpecs
          recipe={selectedRecipe}
          goBack={() => setSelectedRecipe(null)}
          enlist={enlistRecipe}
          like={likeRecipe}
          remove={removeRecipe}
        />
      ) : (
        <>
          <RecipeCollection
            recipes={recipes}
            selectRecipe={setSelectedRecipe}
            enlist={enlistRecipe}
            like={likeRecipe}
            remove={removeRecipe}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <YourRecipeBook
            recipes={yourRecipes}
            release={releaseRecipe}
            like={likeRecipe}
            remove={removeRecipe}
          />
        </>
      )}

      <footer>
        <p>© 2025 Cafe Delli</p>
      </footer>
    </div>
  );
}

export default App;
