import React, { Component } from 'react';
import Form from './Form.js';
import SaladDisplay from './SaladDisplay.js';
import 'whatwg-fetch';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header top-bar row">
          <h2 className="title">What Salad Should You Eat?</h2>
        </div>
        <div className="container">
          <div className="row main-display-row">
            <div className="col-md-6 form-display">
            <Form
              onSubmitForm={this.onSubmitForm.bind(this)}
              onSeasonalSubmit ={this.onSeasonalSubmit.bind(this)}
            />
            </div>
            <div className="col-md-6 salad-display">
              <SaladDisplay ref='saladDisplay'/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSubmitForm(text) {
    this.refs.saladDisplay.getRecipe(text);
  }

  onSeasonalSubmit() {
    this.refs.saladDisplay.getSeasonal();
  }
}

export default App;
