recipes = [
  { publisher: 'The Pioneer Woman',
    f2f_url: 'http://food2fork.com/view/47041',
    title: 'Pasta Salad with Tomatoes, Zucchini, and Feta',
    source_url: 'http://thepioneerwoman.com/cooking/2011/03/pasta-salad-with-tomatoes-zucchini-and-feta/',
    recipe_id: '47041',
    image_url: 'http://static.food2fork.com/5566512470_9e98939ab3_z2766.jpg',
    social_rank: 99.99999855322939,
    publisher_url: 'http://thepioneerwoman.com' },
  { publisher: 'Epicurious',
    f2f_url: 'http://food2fork.com/view/9a88d4',
    title: 'Tomato Salad with Shallot Vinaigrette, Capers, and Basil',
    source_url: 'http://www.epicurious.com/recipes/food/views/Tomato-Salad-with-Shallot-Vinaigrette-Capers-and-Basil-395510',
    recipe_id: '9a88d4',
    image_url: 'http://static.food2fork.com/395510f3b6.jpg',
    social_rank: 99.99989415559496,
    publisher_url: 'http://www.epicurious.com' },
  { publisher: '101 Cookbooks',
    f2f_url: 'http://food2fork.com/view/47859',
    title: 'Heirloom Tomato Salad',
    source_url: 'http://www.101cookbooks.com/archives/heirloom-tomato-salad-recipe.html',
    recipe_id: '47859',
    image_url: 'http://static.food2fork.com/tomato_salad_recipedc47.jpg',
    social_rank: 99.99956954982561,
    publisher_url: 'http://www.101cookbooks.com' },
  { publisher: 'Two Peas and Their Pod',
    f2f_url: 'http://food2fork.com/view/54483',
    title: 'Black Quinoa Salad with Mango, Avocado, & Tomatoes',
    source_url: 'http://www.twopeasandtheirpod.com/black-quinoa-salad-with-mango-avocado-tomatoes/',
    recipe_id: '54483',
    image_url: 'http://static.food2fork.com/blackquinoasalad4632f.jpg',
    social_rank: 99.99868467735365,
    publisher_url: 'http://www.twopeasandtheirpod.com' },
  { publisher: 'BBC Good Food',
    f2f_url: 'http://food2fork.com/view/3e0262',
    title: 'Salmon &amp; broccoli cakes with watercress, avocado &amp; tomato salad',
    source_url: 'http://www.bbcgoodfood.com/recipes/1898643/salmon-and-broccoli-cakes-with-watercress-avocado-',
    recipe_id: '3e0262',
    image_url: 'http://static.food2fork.com/1898643_MEDIUMd188.jpg',
    social_rank: 99.9980605197234,
    publisher_url: 'http://www.bbcgoodfood.com' } ]


function removePastaSalads(recipes) {
  let onlyGreenSalads = [];
  for (let i = 0; i < recipes.length; i++) {
    if (!recipes[i].title.includes("pasta") && !recipes[i].title.includes("Pasta")) {
      onlyGreenSalads.push(recipes[i]);
    }
  }
  return onlyGreenSalads;
}


console.log(removePastaSalads(recipes));
