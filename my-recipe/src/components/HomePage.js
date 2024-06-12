import React, { useContext, useState } from 'react';
import { RecipeContext } from '../context/RecipeContext';
import RecipeList from './RecipeList';
import ModalForm from './ModalForm';
import jsPDF from 'jspdf';

function HomePage() {
  const { recipes, addRecipe, deleteRecipe, editRecipe } = useContext(RecipeContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentRecipeIndex(null);
  };

  const handleDelete = (index) => {
    deleteRecipe(index);
  };

  const handleEdit = (index) => {
    setCurrentRecipeIndex(index);
    openModal();
  };

  const downloadRecipeBook = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const sectionSpacing = 5; // Adjust this value for spacing between sections
    const lineHeight = 5; // Adjust this value for line height

    recipes.forEach((recipe, index) => {
      if (index > 0) {
        doc.addPage();
      }

      let y = 20;

      // Title
      doc.setFontSize(18);
      doc.text(recipe.name, 20, y);
      y += 20; // More space after title

      // Image
      if (recipe.image) {
        const img = new Image();
        img.src = recipe.image;
        doc.addImage(img, 'JPEG', 20, y, 160, 90); // Adjust the size and position as needed
        y += 100 + sectionSpacing;
      }

      // Ingredients
      doc.setFontSize(14);
      doc.text('Ingrédients:', 20, y);
      y += 10;
      doc.setFontSize(12);
      const ingredientsLines = doc.splitTextToSize(recipe.ingredients, 160);
      if (y + ingredientsLines.length * lineHeight > pageHeight) {
        doc.addPage();
        y = 20;
      }
      doc.text(ingredientsLines, 20, y);
      y += ingredientsLines.length * lineHeight + sectionSpacing;

      // Steps
      doc.setFontSize(14);
      doc.text('Étapes:', 20, y);
      y += 10;
      doc.setFontSize(12);
      const stepsLines = doc.splitTextToSize(recipe.steps, 160);
      if (y + stepsLines.length * lineHeight > pageHeight) {
        doc.addPage();
        y = 20;
      }
      doc.text(stepsLines, 20, y);
      y += stepsLines.length * lineHeight + sectionSpacing;

      // Time
      doc.setFontSize(14);
      doc.text('Temps:', 20, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(recipe.time, 20, y);
    });

    doc.save('recipe_book.pdf');
  };

  return (
    <div className="home-page">
      {recipes.length === 0 ? (
        <div className="no-recipes">
          <h2>Pas de recette disponible</h2>
          <p>Pourquoi ne pas créer une nouvelle recette?</p>
          <button onClick={openModal} className="button">Ajouter une recette</button>
        </div>
      ) : (
        <>
          <h2>Vos recettes</h2>
          <RecipeList openModal={openModal} onEdit={handleEdit} onDelete={handleDelete} />
          <button onClick={downloadRecipeBook} className="button">Téléchargez votre livre de recettes</button>
        </>
      )}
      <ModalForm isOpen={modalIsOpen} onRequestClose={closeModal} recipeIndex={currentRecipeIndex} />
    </div>
  );
}

export default HomePage;
