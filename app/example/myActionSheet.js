import React from 'react';
import ActionSheet from '../components/actionSheet/actionSheet';
import Button from '../components/button/button';

export default class myActionSheet extends React.Component {
  state = {
    show1: false,
  }
  handleClick = () => {
    this.state.show1 ? this.setState({show1:false}) : this.setState({show1:true})
  }
  cancel = () => {
    this.setState({show1:false})
  }
  clickA = () => {
    alert("您点击了第一个按钮")
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick} block>actionSheet</Button>
        <ActionSheet show={this.state.show1} onRequestClose={this.cancel}>
          <ul>
            <li onClick={this.clickA}>alert</li>
            <li>
              <a href="tel:4008123123">订餐电话</a>
            </li>
            <li>选项三</li>
            <li>选项四</li>
            <li onClick={this.cancel}>取消</li>
          </ul>
        </ActionSheet>
      </div>
    );
  }
};
