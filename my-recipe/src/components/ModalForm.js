import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { RecipeContext } from '../context/RecipeContext';
import ReactStars from 'react-rating-stars-component';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/ModalForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    ingredients: [],
    steps: [],
    time: '',
    image: '',
    difficulty: 0
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [newStep, setNewStep] = useState('');

  useEffect(() => {
    if (recipeIndex !== null) {
      setRecipe(recipes[recipeIndex]);
    } else {
      setRecipe({ name: '', ingredients: [], steps: [], time: '', image: '', difficulty: 0 });
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

  const addIngredient = () => {
    if (newIngredient.trim() === '') return;
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, newIngredient]
    });
    setNewIngredient('');
  };

  const addStep = () => {
    if (newStep.trim() === '') return;
    setRecipe({
      ...recipe,
      steps: [...recipe.steps, newStep]
    });
    setNewStep('');
  };

  const removeItem = (list, index) => {
    const newList = Array.from(list);
    newList.splice(index, 1);
    return newList;
  };

  const duplicateItem = (list, index) => {
    const newList = Array.from(list);
    newList.splice(index, 0, list[index]);
    return newList;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result, type) => {
    if (!result.destination) return;

    const items = reorder(
      type === 'ingredient' ? recipe.ingredients : recipe.steps,
      result.source.index,
      result.destination.index
    );

    if (type === 'ingredient') {
      setRecipe({ ...recipe, ingredients: items });
    } else {
      setRecipe({ ...recipe, steps: items });
    }
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
            <div className='custom-space-container'>
              <input
                type="text"
                placeholder="Nouvel ingrédient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <button type="button" onClick={addIngredient}>Ajouter Ingrédient</button>
            </div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, 'ingredient')}>
              <Droppable droppableId="ingredients">
                {(provided) => (
                  <ul className="ingredient-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {recipe.ingredients.map((ingredient, index) => (
                      <Draggable key={index} draggableId={`ingredient-${index}`} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            {ingredient}
                            <div>
                              <button type="button" onClick={() => setRecipe({ ...recipe, ingredients: duplicateItem(recipe.ingredients, index) })}><FontAwesomeIcon icon={faCopy} /></button>
                              <button type="button" onClick={() => setRecipe({ ...recipe, ingredients: removeItem(recipe.ingredients, index) })}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            <div className='custom-space-container'>
              <input
                type="text"
                placeholder="Nouvelle étape"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
              />
              <button type="button" onClick={addStep}>Ajouter Étape</button>
            </div>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, 'step')}>
              <Droppable droppableId="steps">
                {(provided) => (
                  <ul className="step-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {recipe.steps.map((step, index) => (
                      <Draggable key={index} draggableId={`step-${index}`} index={index}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            {step}
                            <div>
                              <button type="button" onClick={() => setRecipe({ ...recipe, steps: duplicateItem(recipe.steps, index) })}><FontAwesomeIcon icon={faCopy} /></button>
                              <button type="button" onClick={() => setRecipe({ ...recipe, steps: removeItem(recipe.steps, index) })}><FontAwesomeIcon icon={faTrash} /></button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
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
          <p><strong>Ingrédients:</strong></p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p><strong>Étapes:</strong></p>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
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
