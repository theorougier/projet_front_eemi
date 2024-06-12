import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';
import '../styles/RecipeDetails.css';
import ReactStars from 'react-rating-stars-component';


function RecipeDetails() {
  const { id } = useParams();
  const { recipes } = useContext(RecipeContext);
  const recipe = recipes[id];

  if (!recipe) {
    return <p>Recipe not found!</p>;
  }

  return (
    <>
    <Link to={"/"} className='previous-button'>Précédent</Link>
      <div className="recipe-details">
        <h2>{recipe.name}</h2>
        {recipe.image && <img src={recipe.image} alt={recipe.name} />}
        <div className="recipe-info">
          <h3>Ingrédients</h3>
          <p>{recipe.ingredients}</p>
          <h3>Étapes</h3>
          <p>{recipe.steps}</p>
          <h3>Temps</h3>
          <p>{recipe.time}</p>
          <h3>Difficulté</h3>
          <ReactStars count={5} value={recipe.difficulty} edit={false} size={24} activeColor="#ffd700" />
        </div>
      </div>
    </>
  );
}

export default RecipeDetails;
