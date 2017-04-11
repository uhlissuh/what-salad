import React, { Component } from 'react';

class SaladDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      recipeTitle: "",
      recipeUrl: "",
      recipeImg: ""
    };
  }

  render() {
    return (
      <div className="salad-box">
      {this.getRecipe(this.state.searchText)}
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
          console.log(data.recipes[0]);
        })
        .catch(error => {
          console.log("fetch error ", error);
        })
    }
  }
}


export default SaladDisplay;
