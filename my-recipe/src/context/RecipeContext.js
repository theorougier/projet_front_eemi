import React, { createContext, useState, useEffect } from 'react';

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipesState] = useState([]);

  // Load recipes from localStorage when the component mounts
  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipesState(JSON.parse(storedRecipes));
    }
  }, []);

  // Save recipes to localStorage whenever the recipes state changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe) => {
    setRecipesState([...recipes, recipe]);
  };

  const deleteRecipe = (index) => {
    setRecipesState(recipes.filter((_, i) => i !== index));
  };

  const editRecipe = (index, newRecipe) => {
    const updatedRecipes = recipes.map((recipe, i) => (i === index ? newRecipe : recipe));
    setRecipesState(updatedRecipes);
  };

  const setRecipes = (newRecipes) => {
    setRecipesState(newRecipes);
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, deleteRecipe, editRecipe, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};
