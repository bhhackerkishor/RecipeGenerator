const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
const port = 5000;

// Middleware to parse JSON requests
app.use(cors());
app.use(express.json());

// Endpoint to fetch recipes based on Indian cuisine
app.get('/api/recipes', async (req, res) => {
    console.log("Fetching Indian recipes...");
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian');
        res.json(response.data.meals);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: 'Error fetching recipes' });
    }
});

// Endpoint to fetch detailed recipe data
app.get('/api/recipe/:id', async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching recipe details for ID: ${id}`);

    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recipeDetails = response.data.meals ? response.data.meals[0] : null;
        if (recipeDetails) {
            res.json(recipeDetails);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        res.status(500).json({ error: 'Error fetching recipe details' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});
