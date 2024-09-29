const apiKey = 'e6de639d76ac4c96b495d2ff0c63b6d9';  // Your Spoonacular API key

document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const ingredients = document.getElementById('ingredients').value.trim();
    const diet = document.getElementById('diet').value;
    
    if (ingredients === "") {
        alert("Please enter some ingredients.");
        return;
    }

    fetchRecipes(ingredients, diet);
});

async function fetchRecipes(ingredients, diet) {
    const recipeOutput = document.getElementById('recipe-result');
    recipeOutput.innerHTML = '<p>Loading recipes...</p>'; // Show loading text

    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${encodeURIComponent(ingredients)}&diet=${diet !== 'none' ? diet : ''}&number=5&addRecipeInformation=true`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length === 0) {
            recipeOutput.innerHTML = '<p>No recipes found for the given ingredients.</p>';
            return;
        }

        displayRecipes(data.results);
    } catch (error) {
        recipeOutput.innerHTML = `<p>Failed to fetch recipes. Please try again later.</p>`;
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipeOutput = document.getElementById('recipe-result');
    recipeOutput.innerHTML = '';  // Clear previous content

    recipes.forEach(recipe => {
        const recipeElement = `
            <div class="recipe">
                <h3>${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> ${recipe.servings}</p>
                <a href="${recipe.sourceUrl}" target="_blank">View Full Recipe</a>
            </div>
        `;
        recipeOutput.innerHTML += recipeElement;
    });

    // Show a "Go Back" button
    const backButton = `<button id="back-btn" onclick="goBack()">Go Back</button>`;
    recipeOutput.innerHTML += backButton;
    recipeOutput.style.display = 'block';
}

function goBack() {
    const recipeOutput = document.getElementById('recipe-result');
    recipeOutput.style.display = 'none';  // Hide the results
    document.getElementById('recipe-form').style.display = 'block';  // Show the form again
}
