
import React from 'react';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{padding:20}}>
        <a href="#carousel" style={{marginLeft:20}}>
          carousel
        </a>
        <a href="#button" style={{marginLeft:20}}>
          button
        </a>
        <a href="#actionSheet" style={{marginLeft:20}}>
          actionSheet
        </a>
        <a href="#myList" style={{marginLeft:20}}>
          List
        </a>
      </div>
    );
  }
};
