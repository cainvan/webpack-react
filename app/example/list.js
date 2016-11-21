import React, {Component} from 'react';
import LazyLoad from 'react-lazyload';

export default class Overflow extends Component {
  constructor() {
    super();
    this.state = {
      arr:[
        <div style={{height:200, backgroundColor:'red'}}><img src='https://img3.doubanio.com/img/celebrity/medium/2026.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'yellow'}}><img src='https://img1.doubanio.com/img/celebrity/medium/1456108960.49.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'green'}}><img src='https://img3.doubanio.com/img/celebrity/medium/34602.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'gray'}}><img src='https://img3.doubanio.com/img/celebrity/medium/34602.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'blue'}}><img src='https://img3.doubanio.com/img/celebrity/medium/805.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'#FD6B65'}}><img src='https://img3.doubanio.com/img/celebrity/medium/2026.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'#3DBF9B'}}><img src='https://img3.doubanio.com/img/celebrity/medium/1435567211.65.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'#454545'}}><img src='https://img3.doubanio.com/img/celebrity/medium/2026.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'#FD6B65'}}><img src='https://img3.doubanio.com/img/celebrity/medium/1358924731.83.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'#45B0FC'}}><img src='https://img3.doubanio.com/img/celebrity/medium/2026.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'gray'}}><img src='https://img3.doubanio.com/img/celebrity/medium/46584.jpg'></img></div>,
        <div style={{height:200, backgroundColor:'#3DBF9B'}}><img src='https://img3.doubanio.com/img/celebrity/medium/2026.jpg'></img></div>
      ],
    };
  }

  render() {
    return (
      <div className="wrapper overflow-wrapper">
        {/* <h1>LazyLoad in Overflow Container</h1> */}
        <div className="widget-list overflow" style={{height:window.innerHeight}}>
          {this.state.arr.map((el, index) => {
            return (
              <LazyLoad key={index} overflow throttle={200} height={200}>
                {el}
              </LazyLoad>
            );
          })}
        </div>
      </div>
    );
  }
}
