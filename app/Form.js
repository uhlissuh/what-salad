import React, { Component } from 'react';
import './Form.css';


class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {text: ''};
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>vegetables: </label>
          <input
            className="veggieInput"
            type="text"
            placeholder="asparagus"
            onChange={this.handleChange}
            value={this.state.text} />
          <button type='submit'>Go</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmitForm(this.state.text);
  }
}

export default Form;
