"use client"

import { useEffect, useState } from "react";

interface Recipe {
  name: string;
  steps: string[];
  ingredients: {
    available: string[];
    needed: string[];
  };
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes);
      setAssistantId(data.assistantId);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🍳 MealPrepper AI - Recipe Suggestions</h1>
      {assistantId && <p className="text-sm text-gray-500">Assistant ID: {assistantId}</p>}

      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
            <h3 className="font-medium">📝 Instructions:</h3>
            <ol className="list-decimal pl-6 mb-2">
              {recipe.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <h3 className="font-medium">✅ Available Ingredients:</h3>
            <ul className="list-disc pl-6 mb-2">
              {recipe.ingredients.available.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <h3 className="font-medium">🛒 Needed Ingredients:</h3>
            <ul className="list-disc pl-6">
              {recipe.ingredients.needed.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No recipes found. Try again later!</p>
      )}

      <button
        onClick={fetchRecipes}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Refresh Recipes
      </button>
    </main>
  );
}