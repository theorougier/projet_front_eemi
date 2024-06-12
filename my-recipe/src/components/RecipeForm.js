import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

function RecipeForm() {
  const { addRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    steps: '',
    time: '',
    image: ''
  });

  const handleChange = (e) => {
    console.log(`Updating field ${e.target.name} to ${e.target.value}`);
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting recipe:', recipe);
    addRecipe(recipe);
    setRecipe({ name: '', ingredients: '', steps: '', time: '', image: '' });
    navigate('/');
  };

  return (
    <div className="recipe-form">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          required
        />
        <textarea
          name="steps"
          placeholder="Steps"
          value={recipe.steps}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Time"
          value={recipe.time}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={recipe.image}
          onChange={handleChange}
        />
        <button type="submit">Ajouter une recette</button>
      </form>
    </div>
  );
}

export default RecipeForm;
