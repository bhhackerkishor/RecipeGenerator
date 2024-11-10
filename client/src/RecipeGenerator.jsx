import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import './RecipeGenerator.css';

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setIngredients(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setRecipes([]);
        setRecipeDetails(null);

        try {
            const response = await axios.get(`http://localhost:5000/api/recipes`);
            console.log('Fetched recipes:', response.data);
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            setError('Failed to fetch recipes. Please try again.');
        }
    };

    const fetchRecipeDetails = async (id) => {
        console.log(`Fetching details for recipe ID: ${id}`);
        try {
            const response = await axios.get(`http://localhost:5000/api/recipe/${id}`);
          

            const data = response.data;
            const ingredientsList = [];
            for (let i = 1; i <= 20; i++) {
                if (data[`strIngredient${i}`]) {
                    ingredientsList.push(`${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`);
                }
            }

            setRecipeDetails({
                title: data.strMeal,
                image: data.strMealThumb,
                ingredients: ingredientsList,
                instructions: data.strInstructions,
                readyInMinutes: "N/A",
                
            });

          

        } catch (error) {
            console.error("Error fetching recipe details:", error);
            setError('Failed to fetch recipe details.');
        }
    };

    useEffect(() => {
        if (recipeDetails) {
            const instructionsSection = document.getElementById("instructions-section");
            if (instructionsSection) {
                instructionsSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [recipeDetails]);

    return (
        <div className="App">
        

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ingredients}
                    onChange={handleChange}
                    placeholder="Enter ingredients (e.g. chicken, tomato, onion)"
                />
                <button type="submit">Generate Recipes</button>
            </form>

            {error && <p className="error">{error}</p>}

            <div>
                {recipes.length > 0 && (
                    <ul className="recipe-list">
                        {recipes.map((recipe) => (
                            <li key={recipe.idMeal} onClick={() => fetchRecipeDetails(recipe.idMeal)}>
                                <h3>{recipe.strMeal}</h3>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {recipeDetails && (
                <div className="recipe-details " id="instructions-section">
                    <h2>{recipeDetails.title}</h2>
                    <img src={recipeDetails.image} alt={recipeDetails.title} />
                    <h3>Ingredients:</h3>
                    <ul>
                        {recipeDetails.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Instructions:</h3>
                    <p>{recipeDetails.instructions}</p>
                    <p><strong>Ready in {recipeDetails.readyInMinutes} minutes</strong></p>
                </div>
            )}

        </div>
    );
}

export default RecipeGenerator;
