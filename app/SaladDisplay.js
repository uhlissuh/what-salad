import React, { Component } from 'react';

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
      let query = encodeURIComponent(text);
      let serverEndpoint = '/salad/' + query;
      fetch(serverEndpoint)
        .then(response => response.json())
        .then(data => {
          if (data.recipes != null) {
            let numberOfRecipes = data.recipes.length;
            let randomNumber = Math.floor((Math.random() * numberOfRecipes) + 1);
            this.setState({
              recipeTitle: data.recipes[randomNumber].title,
              recipeUrl: data.recipes[randomNumber].source_url,
              recipeImg: data.recipes[randomNumber].image_url,
              recipePublisher: data.recipes[randomNumber].publisher,
              recipeError: ""
            });
          } else {
            this.setState({
              recipeTitle: null,
              recipeUrl: null,
              recipeImg: null,
              recipePublisher: null,
              recipeError: "No recipes found with those ingredients!",
            })
          }
        })
        .catch(error => {
          console.log("fetch error ", error);
        });
    }
  }

  getSeasonal() {
    let serverEndpoint = "/seasonal";

    fetch(serverEndpoint)
    .then(response => response.json())
    .then(data => {
      if (data.recipes != null) {
        let numberOfRecipes = data.recipes.length;
        let randomNumber = Math.floor((Math.random() * numberOfRecipes));
        this.setState({
          recipeTitle: data.recipes[randomNumber].title,
          recipeUrl: data.recipes[randomNumber].source_url,
          recipeImg: data.recipes[randomNumber].image_url,
          recipePublisher: data.recipes[randomNumber].publisher,
          recipeError: ""
        });
      } else {
        this.setState({
          recipeTitle: null,
          recipeUrl: null,
          recipeImg: null,
          recipePublisher: null,
          recipeError: "No recipes found with those ingredients!",
        })
      }
    })
    .catch(error => {
      console.log("fetch error ", error);
    });
  }
}



export default SaladDisplay;
