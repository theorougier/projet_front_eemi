import React from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ReactStars from 'react-rating-stars-component';
import '../styles/RecipeCard.css';

function RecipeCard({ recipe, index, onDelete, onEdit }) {
  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    const pageHeight = doc.internal.pageSize.height;
    const sectionSpacing = 5; // Adjust this value for spacing between sections
    const lineHeight = 5; // Adjust this value for line height

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

    doc.save(`${recipe.name}.pdf`);
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${index}`} className="recipe-link">
        <h2>{recipe.name}</h2>
        {recipe.image && <img src={recipe.image} alt={recipe.name} />}
        <p className="ingredients"><strong>Ingrédients:</strong> {recipe.ingredients}</p>
        <p className="steps"><strong>Étapes:</strong> {recipe.steps}</p>
        <p className="time"><strong>Temps:</strong> {recipe.time}</p>
        <div className="difficulty">
          <strong>Difficulté:</strong>
          <ReactStars count={5} value={recipe.difficulty} edit={false} size={24} activeColor="#ffd700" />
        </div>
      </Link>
      <div className='recipe-footer-card'>
        <button onClick={downloadPDF} className="download-button">Télécharger la recette</button>
        <div className='crud-button'>
          <button onClick={() => onEdit(index)} className="edit-button">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => onDelete(index)} className="delete-button">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
