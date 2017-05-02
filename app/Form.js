import React, { Component } from 'react';


class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSeasonal = this.handleSeasonal.bind(this);
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}>
          <div className="input-group">
            <input
              ref="searchWords"
              className="veggieInput form-control"
              type="text"
              placeholder="Enter ingredients for your salad"
            />
          <span className="input-group-btn">
              <button
                className="btn btn-success"
                type='submit'>
                Go
              </button>
            </span>
          </div>
          <br />
        <button
          className="btn btn-success btn-block"
          onClick={this.handleSeasonal}>
          Seasonal Surprise!
        </button>
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
