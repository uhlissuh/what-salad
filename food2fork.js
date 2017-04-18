const request = require('request');

exports.getRankedRecipes= function(query) {
  return new Promise((resolve, reject) => {
    const API_KEY = "2fbcf141f4f25cde67d9645786a849a9";
    let url = "http://food2fork.com/api/search?sort=r&key=" + API_KEY + "&q=" + query;
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
          console.log(recipesArray);
          let sortedRecipes = recipesArray.sort(function(recipeA, recipeB) {
            return scoreRecipe(recipeA) - scoreRecipe(recipeB);
          });
          let sortedAndNoPastaSalads = removePastaSalads(sortedRecipes);
          resolve(JSON.stringify({
            'query': query,
            'recipes': sortedAndNoPastaSalads,
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

function removePastaSalads(recipes) {
  let onlyGreenSalads = [];
  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].title.includes("pasta") &&
        !recipes[i].title.includes("Pasta") &&
        !recipes[i].title.includes("noodle") &&
        !recipes[i].title.includes("Noodle") &&
        !recipes[i].title.includes("Macaroni") &&
        !recipes[i].title.includes("macaroni")) {
      onlyGreenSalads.push(recipes[i]);
    }
  }
  return onlyGreenSalads;
}
