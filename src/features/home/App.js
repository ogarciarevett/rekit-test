import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div className="home-app">
        <div className="page-container">{this.props.children}</div>
        <style>
          @import url('https://fonts.googleapis.com/css?family=Pacifico|Work+Sans');
        </style>
      </div>
      
    );
  }
}
