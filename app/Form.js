import React, { Component } from 'react';
import './Form.css';


class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSeasonal = this.handleSeasonal.bind(this);
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>vegetables: </label>
          <input
            ref="searchWords"
            className="veggieInput"
            type="text"
            placeholder="asparagus"
          />
          <button type='submit'>Go</button>
          <br />
          <button onClick={this.handleSeasonal}>Seasonal Surprise!</button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmitForm(this.refs.searchWords.value);
  }

  handleSeasonal(e) {
    e.preventDefault();
    this.props.onSeasonalSubmit();
  }
}

export default Form;
