import axios from 'axios';

export const fetchRecipes = (ingredients) => axios.get(
    'https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
            ingredients,
            number: 25,
            ignorePantry: true,
            apiKey: '1fd5a4eb995e4292b43a689019516f9b' , // API key
        },
    },
);

export const fetchRecipeById = (recipeId) => axios.get(
    `https://api.spoonacular.com/recipes/${recipeId}/information`, {
        params: {
            includeNutrition: false,
            apiKey: '1fd5a4eb995e4292b43a689019516f9b' , // API key
        },
    },
);