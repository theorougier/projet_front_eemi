import React, { useContext } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeCard from './RecipeCard';
import '../styles/RecipeList.css';

function RecipeList({ openModal, onEdit, onDelete }) {
  const { recipes } = useContext(RecipeContext);

  return (
    <div className="recipe-list-container">
      <div className="recipe-list">
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} index={index} onEdit={onEdit} onDelete={onDelete} />
        ))}
        <div className="add-recipe-card" onClick={openModal}>
          <span className="add-recipe-button">+</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeList;
