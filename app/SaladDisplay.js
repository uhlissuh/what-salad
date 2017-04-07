import React, { Component } from 'react';

class SaladDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {searchText: ""};
  }

  render() {
    return (
      <div className="salad-box">
      {this.getRecipe(this.state.searchText)}
      </div>
    );
  }

  getRecipe(query) {
    const API_KEY = "8756beb18496b780f61372738958adf2";
    let url = "http://food2fork.com/api/search?sort=r&key=" + API_KEY + "&q=" + encodeURIComponent(query);

    // fetch(url)
    // .then(data => {
    //   console.log(data);
    // });
  }
}


export default SaladDisplay;
