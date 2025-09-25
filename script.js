const API_URL = "http://localhost:3000/recipes";

const recipeList = document.getElementById("recipe-list");
const searchBar = document.getElementById("searchBar");
const themeToggle = document.getElementById("themeToggle");
const categoryFilter = document.getElementById("categoryFilter");

let allRecipes = []; 
async function fetchRecipes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allRecipes = data;
    populateCategoryFilter(data);
    displayRecipes(data);
  } catch (error) {
    recipeList.innerHTML = "<p>⚠️ Failed to load recipes.</p>";
    console.error("Error fetching recipes:", error);
  }
}
function displayRecipes(recipes) {
  recipeList.innerHTML = "";
  recipes.forEach(meal => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <h3>${meal.name}</h3>
      <img src="${meal.image}" alt="${meal.name}">
      <p><strong>Category:</strong> ${meal.category}</p>
      <p><strong>Likes:</strong> <span class="like-count">${meal.likes}</span></p>
      <button class="like-btn">😁 Like</button>
    `;
    const likeBtn = card.querySelector(".like-btn");
    likeBtn.addEventListener("click", () => {
      updateLikes(meal, card);
    });

    recipeList.appendChild(card);
  });
}
async function updateLikes(meal, card) {
  const newLikes = meal.likes + 1;
  try {
    const res = await fetch(`${API_URL}/${meal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: newLikes })
    });

    if (!res.ok) throw new Error("Failed to update likes");

    meal.likes = newLikes;
    card.querySelector(".like-count").textContent = newLikes;
  } catch (error) {
    console.error("Error updating likes:", error);
  }
}
function populateCategoryFilter(recipes) {
  const categories = [...new Set(recipes.map(r => r.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}
function filterRecipes() {
  const query = searchBar.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = allRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "all" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  displayRecipes(filtered);
}
searchBar.addEventListener("input", filterRecipes);
categoryFilter.addEventListener("change", filterRecipes);
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
fetchRecipes();
