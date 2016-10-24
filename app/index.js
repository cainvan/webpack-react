import React from 'react';
import ReactDOM from 'react-dom';
import MyBt from './example/myBt';
import Carousel from './example/myCarousel';
import ActionSheet from './example/myActionSheet';
import { Router, Route, IndexRoute, browserHistory, hashHistory, Redirect, IndexRedirect} from 'react-router';
import RoutHome from './example/route';
import BtDetail from './example/myBtDetail';

class App extends React.Component {
    render () {
      // 获取屏幕高度
      // console.log(window.screen.height);
        return (
          <div>
          {this.props.children}
          </div>
        );
    }
}

const enterTest = () => {
    console.log("进入轮播");
}

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      {/* 默认根路由 */}
      <IndexRoute component={RoutHome}/>
      {/* 根路由重定向 */}
      {/* <IndexRedirect to="/carousel" /> */}
      {/* 轮播图组件页 */}
      <Route path="/carousel" onEnter={enterTest} component={Carousel}/>
      {/* 按钮跳转及传值测试 */}
      <Route path="/button" component={MyBt}>
        <Redirect from="/button/5" to="/carousel"/>
        {/* path向子页面传值 */}
        <Route path=":id"  component={BtDetail}/>
      </Route>
      {/* 重定向 */}
      {/* <Redirect from="/actionSheet" to="/carousel"/> */}
      {/* 弹出菜单组件 */}
      <Route path="/actionSheet" component={ActionSheet}/>
    </Route>
  </Router>),
  document.getElementById('content')
);
