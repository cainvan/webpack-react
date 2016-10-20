import React from 'react';
import ReactDOM from 'react-dom';
import myBt from './example/myBt';
import Carousel from './example/myCarousel';
import ActionSheet from './example/myActionSheet';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';
import rt from './example/route';

class App extends React.Component {
    render () {
      console.log(window.screen.height);
        return (
          <div>
          {this.props.children}
          </div>
        );
    }
}

ReactDOM.render((
  <Router history={hashHistory}>
        <Route path="/" component={App} >
            <IndexRoute component={rt}/>
            <Route path="/carousel" component={Carousel}/>
            <Route path="/button" component={myBt}/>
            <Route path="/actionSheet" component={ActionSheet}/>
        </Route>
  </Router>),
  document.getElementById('content')
);
