import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='bandeau-header'>
        <header className="header-content">
          <h1>My Recipe.com</h1>
          <nav>
            <Link to="/">Accueil</Link>
          </nav>
        </header>
        </div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-recipe" element={<RecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
