import React, { Component } from 'react';


class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSeasonal = this.handleSeasonal.bind(this);
    this.state = {
      alreadySearched: false
    }
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
              placeholder="Enter salad ingredients"
            />
          <span className="input-group-btn">
              {this.state.alreadySearched ? <button className="btn btn-success" type='submit'>Gimme Another</button> : <button className="btn btn-success" type='submit'>Find a Salad</button>}
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
    this.setState({alreadySearched: true});
    e.preventDefault();
    this.props.onSubmitForm(this.refs.searchWords.value);
  }

  handleSeasonal(e) {
    e.preventDefault();
    this.props.onSeasonalSubmit();
  }
}

export default Form;
