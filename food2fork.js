const request = require('request');

exports.getRankedRecipes= function(query) {
  return new Promise((resolve, reject) => {
    const API_KEY = "2fbcf141f4f25cde67d9645786a849a9";
    let url = "http://food2fork.com/api/search?sort=r&key=" + API_KEY + "&q=" + encodeURIComponent(query);
    request(url, function(error, response, body) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      if (error === 'limit') {
        reject(JSON.stringify({
          'recipes': null,
          'limit': true
        }));
      } else {
        let recipesResponse = JSON.parse(body);
        if (recipesResponse.recipes.length === 0) {
          resolve(JSON.stringify({
            'recipes': null,
            'limit': false}
          ));
        } else {
          let recipesArray = recipesResponse.recipes;
          let sortedRecipes = recipesArray.sort(function(recipeA, recipeB) {
            return scoreRecipe(recipeA) - scoreRecipe(recipeB);
          });
          resolve(JSON.stringify({
            'recipes': sortedRecipes,
            'limit': false}
          ));
        }
      }
    })
  });
}


function scoreRecipe(recipe) {
  let preferredPublishers = ["Bon Appetit", "Serious Eats", "Smitten Kitchen", "Simply Recipes"];
  let indexOfRecipe = preferredPublishers.indexOf(recipe.publisher);
  if (indexOfRecipe == -1) {
    return 100;
  } else {
    return indexOfRecipe;
  }
}
