import React from 'react';

export default class myBt extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //debugger;
    //console.log(this.props.location.query.name);
  }
  render() {
    if (this.props.params.id == 3) {
      return (
        <h1>你点的第{this.props.params.id}个按钮哈~~</h1>
      );
    }
    return (
      <div>
        <h1>你点的第{this.props.params.id}个按钮哈~~</h1>
        <h1>name:{this.props.location.query.name}</h1>
        <h1>age:{this.props.location.query.age}</h1>
      </div>
    );
  }
};
