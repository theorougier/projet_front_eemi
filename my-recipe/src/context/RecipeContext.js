import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  // Load recipes from localStorage when the component mounts
  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  // Save recipes to localStorage whenever the recipes state changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const deleteRecipe = (index) => {
    setRecipes(recipes.filter((_, i) => i !== index));
  };

  const editRecipe = (index, newRecipe) => {
    const updatedRecipes = recipes.map((recipe, i) => (i === index ? newRecipe : recipe));
    setRecipes(updatedRecipes);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe, editRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
