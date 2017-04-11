import React, { Component } from 'react';
import './Form.css';


class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmitForm(this.refs.searchWords.value);
  }
}

export default Form;
