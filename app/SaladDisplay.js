import React, { Component } from 'react';
import 'whatwg-fetch';

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
      limitError: "",
      isLoading: false
    };
  }

  render() {
    if (this.state.recipeError) {
      return (
        <div className="salad-box-error">
          <span>{this.state.recipeError}</span>
        </div>
      );
    } else if (this.state.limitError) {
      return (
        <div className="salad-box-error">
          <span>{this.state.limitError}</span>
        </div>
      );
    } else if (this.state.isLoading){
      return (
        <div className="salad-box">
          <img className="img-responsive center-block recipe-image" src="spinner.gif"></img>
        </div>
      )
    } else {
      return (
        <div className="salad-box">
          <a href={this.state.recipeUrl} target="_blank">
            <h2 className="recipe-title">{this.state.recipeTitle}</h2>
          </a>
          <br></br>
          <a href={this.state.recipeUrl} target="_blank">
            {this.state.recipeTitle ? <img className="img-responsive center-block recipe-image" src={this.state.recipeImg}></img> : <img className="img-responsive center-block" src="lettuce.png"></img>}

          </a>
          {this.state.recipePublisher ? <p className="publisher-info"><a href={this.state.recipeUrl}>from {this.state.recipePublisher}</a></p> : <p></p>}
        </div>
      );
    }
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
        this.setState({isLoading: true});
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
                recipeError: "",
                isLoading: false
              });
            } else if (data.limit === true){
              this.setState({
                recipeTitle: null,
                recipeUrl: null,
                recipeImg: null,
                recipePublisher: null,
                limitError: "Shockingly, we've reached our daily API call limit, try this app again tomorrow.",
                isLoading: false
              })
            } else {
              this.setState({
                recipeTitle: null,
                recipeUrl: null,
                recipeImg: null,
                recipePublisher: null,
                recipeError: "Oops, no recipes found with those ingredients. Search again!",
                isLoading: false
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
        recipeError: "",
        isLoading: false
      });
    } else {
      let serverEndpoint = "/seasonal";
      this.setState({isLoading: true});
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
            recipeError: "",
            isLoading: false
          });
        } else {
          this.setState({
            recipeTitle: null,
            recipeUrl: null,
            recipeImg: null,
            recipePublisher: null,
            recipeError: "No recipes found with those ingredients!",
            isLoading: false
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
