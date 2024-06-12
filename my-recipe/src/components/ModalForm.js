import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { RecipeContext } from '../context/RecipeContext';
import ReactStars from 'react-rating-stars-component';
import '../styles/ModalForm.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '2em',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '90vh',
    width: '80%',
    overflow: 'auto'
  }
};

Modal.setAppElement('#root');

function ModalForm({ isOpen, onRequestClose, recipeIndex }) {
  const { recipes, addRecipe, editRecipe } = useContext(RecipeContext);
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    steps: '',
    time: '',
    image: '',
    difficulty: 0
  });

  useEffect(() => {
    if (recipeIndex !== null) {
      setRecipe(recipes[recipeIndex]);
    } else {
      setRecipe({ name: '', ingredients: '', steps: '', time: '', image: '', difficulty: 0 });
    }
  }, [recipeIndex, recipes]);

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleDifficultyChange = (newRating) => {
    setRecipe({
      ...recipe,
      difficulty: newRating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeIndex !== null) {
      editRecipe(recipeIndex, recipe);
    } else {
      addRecipe(recipe);
    }
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={recipeIndex !== null ? 'Edit Recipe' : 'Add Recipe'}
    >
      <div className="modal-content">
        <div className="recipe-form-container">
          <h2>{recipeIndex !== null ? 'Modication de la recette' : "Ajout d'une recette"}</h2>
          <form onSubmit={handleSubmit} className="recipe-form">
            <input
              type="text"
              name="name"
              placeholder="Nom de la recette"
              value={recipe.name}
              onChange={handleChange}
              required
            />
            <textarea
              name="ingredients"
              placeholder="Ingrédient"
              value={recipe.ingredients}
              onChange={handleChange}
              required
            />
            <textarea
              name="steps"
              placeholder="Étapes"
              value={recipe.steps}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="time"
              placeholder="Temps"
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
            <div className="difficulty-rating">
              <label>Difficulté:</label>
              <ReactStars
                count={5}
                onChange={handleDifficultyChange}
                size={24}
                activeColor="#ffd700"
                value={recipe.difficulty}
              />
            </div>
            <div className="buttons">
              <button type="submit">{recipeIndex !== null ? 'Modifier la recette' : 'Ajouter la recette'}</button>
              <button type="button" onClick={onRequestClose}>Annuler</button>
            </div>
          </form>
        </div>
        <div className="recipe-preview-container">
          {recipe.image && <img src={recipe.image} alt="Recipe Preview" />}
          <h3>{recipe.name}</h3>
          <p><strong>Ingrédients:</strong> {recipe.ingredients}</p>
          <p><strong>Étapes:</strong> {recipe.steps}</p>
          <p><strong>Temps:</strong> {recipe.time}</p>
          <div className="difficulty-preview">
            <strong>Difficulté:</strong> <ReactStars count={5} value={recipe.difficulty} edit={false} size={24} activeColor="#ffd700" />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ModalForm;
