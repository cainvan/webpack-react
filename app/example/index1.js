import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'rmc-list-view';


var REQUEST_URL = './app/data/movie.json';
class App extends React.Component {
  constructor(props,context) {
  super(props,context);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      loaded:false,
      items: [],
      pullDownStatus: 3,
      pullUpStatus: 0,
    };
    this.page = 1;
    this.itemsChanged = false;

    this.pullDownTips = {
        // 下拉状态
        0: '下拉发起刷新',
        1: '继续下拉刷新',
        2: '松手即可刷新',
        3: '正在刷新',
        4: '刷新成功',
    };

    this.pullUpTips = {
        // 上拉状态
        0: '上拉发起加载',
        1: '松手即可加载',
        2: '正在加载',
        3: '加载成功',
    };

    this.isTouching = false;

    this.onItemClicked = this.onItemClicked.bind(this);

    this.onScroll = this.onScroll.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidMount() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.subjects),
          loaded: true,
        });
      })
  }
  renderLoadingView() {
    return (
        <div>
          Loading ...
        </div>
    );
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    var rowStyle = {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    }
    var imgStyle = {
      height:120,
      width:80
    }
    return(
      <ListView
        style={{ height: 667, backgroundColor:'#FAFAFA' }}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => (
          <div style={rowStyle}>
            <img src={rowData.images.medium} style={imgStyle}/>
            <a style={{flex: 1,marginTop:15,marginLeft:20,fontSize:20,height:36,position:'absolute',color:'#4A4C4B'}}>
              {rowData.original_title}
            </a>
            {/* <a style={{flex: 1,marginTop:50,marginLeft:20,fontSize:18,height:36,position:'absolute'}}>
              {rowData.casts[0].name}
            </a> */}
            <a style={{flex: 1,marginTop:70,marginLeft:20,fontSize:18,height:36,position:'absolute',color:'orange'}}>
              {rowData.rating.average}
            </a>
          </div>
        )}
      />
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('content'));
