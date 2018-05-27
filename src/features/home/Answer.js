import React, { Component } from 'react';
import Proptypes from 'prop-types';

export default class Answer extends Component {
  static propTypes = {
    answer: Proptypes.string.isRequired
  };

  render() {
    const {answer} = this.props;
    return (
      <div>
      <label>
        <input
          value={answer}
          type="checkbox"/>
        {answer}
      </label><br/>
      </div>
    );
  }
}
