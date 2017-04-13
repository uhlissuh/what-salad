import React, { Component } from 'react';
import './App.css';
import Form from './Form.js';
import SaladDisplay from './SaladDisplay.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>What Salad Should You Eat?</h2>
        </div>
        <Form
          onSubmitForm={this.onSubmitForm.bind(this)}
          onSeasonalSubmit ={this.onSeasonalSubmit.bind(this)}
        />
        <SaladDisplay ref='saladDisplay'/>
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
