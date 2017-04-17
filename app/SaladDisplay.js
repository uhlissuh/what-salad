import React, { Component } from 'react';

let lastSearchedRecipes = {};
let lastSeasonalSearchWord = "";

class SaladDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      recipeError: "",
      recipeTitle: "",
      recipeUrl: "",
      recipeImg: "",
      recipePublisher: ""
    };
  }

  render() {
    return (
      <div className="salad-box">
      {this.state.recipeTitle}
      <br></br>
      <a href={this.state.recipeUrl} target="_blank">Check it out on {this.state.recipePublisher}</a>
      <img src={this.state.recipeImg}></img>
      <span>{this.state.recipeError}</span>
    </div>
    );
  }

  getRecipe(text) {
    if (text.length > 0) {
      if (lastSearchedRecipes[text]) {
        lastSearchedRecipes[text].count += 1;
        this.setState({
          recipeTitle: lastSearchedRecipes[text].recipes[lastSearchedRecipes[text].count - 1].title,
          recipeUrl: lastSearchedRecipes[text].recipes[lastSearchedRecipes[text].count - 1].source_url,
          recipeImg: lastSearchedRecipes[text].recipes[lastSearchedRecipes[text].count - 1].image_url,
          recipePublisher: lastSearchedRecipes[text].recipes[lastSearchedRecipes[text].count - 1].publisher,
          recipeError: ""
        });
      } else {
        let query = encodeURIComponent(text);
        let serverEndpoint = '/salad/' + query;
        fetch(serverEndpoint)
          .then(response => response.json())
          .then(data => {
            if (data.recipes != null) {
              lastSearchedRecipes[query] = {
                recipes: data.recipes,
                count: 1
              };
              this.setState({
                recipeTitle: data.recipes[0].title,
                recipeUrl: data.recipes[0].source_url,
                recipeImg: data.recipes[0].image_url,
                recipePublisher: data.recipes[0].publisher,
                recipeError: ""
              });
            } else {
              this.setState({
                recipeTitle: null,
                recipeUrl: null,
                recipeImg: null,
                recipePublisher: null,
                recipeError: "No recipes found with those ingredients!"
              });
            }
          })
          .catch(error => {
            console.log("fetch error ", error);
          });
      }
    }
  }

  getSeasonal() {
    if (lastSeasonalSearchWord != "" && lastSearchedRecipes[lastSeasonalSearchWord].count <= 3) {
      lastSearchedRecipes[lastSeasonalSearchWord].count += 1;
      this.setState({
        recipeTitle: lastSearchedRecipes[lastSeasonalSearchWord].recipes[lastSearchedRecipes[lastSeasonalSearchWord].count - 1].title,
        recipeUrl: lastSearchedRecipes[lastSeasonalSearchWord].recipes[lastSearchedRecipes[lastSeasonalSearchWord].count - 1].source_url,
        recipeImg: lastSearchedRecipes[lastSeasonalSearchWord].recipes[lastSearchedRecipes[lastSeasonalSearchWord].count - 1].image_url,
        recipePublisher: lastSearchedRecipes[lastSeasonalSearchWord].recipes[lastSearchedRecipes[lastSeasonalSearchWord].count - 1].publisher,
        recipeError: ""
      });
    } else {
      let serverEndpoint = "/seasonal";
      fetch(serverEndpoint)
      .then(response => response.json())
      .then(data => {
        if (data.recipes != null) {
          lastSearchedRecipes[data.query] = {
            recipes: data.recipes,
            count: 1
          };
          lastSeasonalSearchWord = data.query;
          this.setState({
            recipeTitle: data.recipes[0].title,
            recipeUrl: data.recipes[0].source_url,
            recipeImg: data.recipes[0].image_url,
            recipePublisher: data.recipes[0].publisher,
            recipeError: ""
          });
        } else {
          this.setState({
            recipeTitle: null,
            recipeUrl: null,
            recipeImg: null,
            recipePublisher: null,
            recipeError: "No recipes found with those ingredients!"
          })
        }
      })
      .catch(error => {
        console.log("fetch error ", error);
      });
    }
  }
}



export default SaladDisplay;
