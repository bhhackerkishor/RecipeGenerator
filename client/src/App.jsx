import React from 'react';
import './App.css';
import RecipeGenerator from './RecipeGenerator';

function Header() {
  return (
      <header className="header">
          <h1>Simple Recipe Generator</h1>
      </header>
  );
}

// Footer Component
function Footer() {
  return (
      <footer className="footer">
          <p className='footer-p'>Created by KishoreKumar</p>
      </footer>
  );
}

function App() {
  return (
    <>
      <Header/>
      <RecipeGenerator />
      <Footer/>
      </>
  );
}

export default App;
