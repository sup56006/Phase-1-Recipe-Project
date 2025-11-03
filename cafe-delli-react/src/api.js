const API_URL = "http://localhost:4000/recipes";

export const fetchRecipes = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
};

export const updateLikes = async (id, likes) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  });
  if (!res.ok) throw new Error("Failed to update likes");
  return res.json();
};

export const deleteRecipe = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete recipe");
  return res.json();
};
