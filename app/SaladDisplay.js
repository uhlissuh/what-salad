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
      recipePublisher: "",
      limitError: ""
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
      <span>{this.state.limitError}</span>
    </div>
    );
  }

  getRecipe(text) {
    let existingVeggie = "";
    if (text.length > 0) {
      if (lastSearchedRecipes[text]) {
         existingVeggie = lastSearchedRecipes[text];
        existingVeggie.count += 1;
        this.setState({
          recipeTitle: existingVeggie.recipes[existingVeggie.count - 1].title,
          recipeUrl: existingVeggie.recipes[existingVeggie.count - 1].source_url,
          recipeImg: existingVeggie.recipes[existingVeggie.count - 1].image_url,
          recipePublisher: existingVeggie.recipes[existingVeggie.count - 1].publisher,
          recipeError: ""
        });
      } else {
        let serverEndpoint = '/salad/' + encodeURIComponent(text);
        fetch(serverEndpoint)
          .then(response => response.json())
          .then(data => {
            if (data.recipes != null) {
              lastSearchedRecipes[text] = {
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
            } else if (data.limit === true){
              this.setState({
                recipeTitle: null,
                recipeUrl: null,
                recipeImg: null,
                recipePublisher: null,
                limitError: "I'm sorry, we've reached our daily API call limit, try us again tomorrow."
              })
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
    let existingVeggie = lastSearchedRecipes[lastSeasonalSearchWord];
    if (lastSeasonalSearchWord != "" && existingVeggie.count <= 3) {
      existingVeggie.count += 1;
      this.setState({
        recipeTitle: existingVeggie.recipes[existingVeggie.count - 1].title,
        recipeUrl: existingVeggie.recipes[existingVeggie.count - 1].source_url,
        recipeImg: existingVeggie.recipes[existingVeggie.count - 1].image_url,
        recipePublisher: existingVeggie.recipes[existingVeggie.count - 1].publisher,
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
