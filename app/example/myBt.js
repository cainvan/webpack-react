import React from 'react';
import Button from '../components/button/button';

export default class myBt extends React.Component {
  constructor(props) {
    super(props);
  }

  testClick(){
    console.log('test click');
  }
  
  render() {
    return (
      <div>
        <Button onClick={this.testClick}>default</Button>
        <Button type="info">info</Button>
        <Button type="primary">primary</Button>
        <Button type="warn">warn</Button>
        <Button type="danger">danger</Button>
      </div>
    );
  }
};
