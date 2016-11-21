import React from 'react';
import ReactDOM from 'react-dom';
import ListView from './src/index.js';
import $ from 'jquery';
import './assets/index.less';

var REQUEST_URL = '/app/data/movie.json';
let items = [];
let page = 1;
class App extends React.Component {
  constructor(props,context) {
  super(props,context);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      loaded:false,
      isLoading:false,
      refreshing: false,
      manual: false,
    };

    this.onEndReached = this.onEndReached.bind(this);
    this.loadData = this.loadData.bind(this);
  }
  componentDidMount() {
    this.loadData();
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(items),
      //   loaded: true,
      //   isLoading: false,
      // });
  }

  loadData() {
    $.ajax({
        url: REQUEST_URL,
        type: 'GET',
        dataType: 'json',
        success: (response) => {
          items =  items.concat(response.subjects);
          console.log("长度是："+items.length);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(items),
            loaded: true,
            isLoading: false,
            refreshing: false,
          });
          ++page;
        }
    });
  }

  onEndReached(event) {
    console.log(this.state.isLoading);
    if(this.state.isLoading == false){
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.loadData();
      }, 1000);
    }
  }

  renderLoadingView() {

    return (
        <div style={{
           color: 'grey',
          padding: 10, textAlign: 'center',
        }}>
          Loading ...
        </div>
    );
  }
  onRefresh() {
    console.log('onRefresh');
    this.setState({ refreshing: true });
    this.refreshing();
  }
  refreshing() {
    console.log("22222");
    items = [];
    this.loadData();
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
      height:140,
      backgroundColor: '#F5FCFF'
    }
    var imgStyle = {
      height:120,
      width:80
    }
    return(
      <ListView
        style={{ height:window.innerHeight, backgroundColor:'#FAFAFA' }}
        dataSource={this.state.dataSource}
        renderFooter={() => (
          <div style={{
             color: 'grey',
            padding: 10, textAlign: 'center',
          }}>
            {this.state.isLoading ? 'loading...' : 'loaded'}
          </div>
        )}
        onEndReached={this.onEndReached}
        pageSize = {14}
        // onEndReachedThreshold={20}
        removeClippedSubviews = {true}
        renderRow={(rowData) => (
          <div style={rowStyle}>
            <img src={rowData.images.medium} style={imgStyle}/>
            <a style={{flex: 1,marginTop:15,marginLeft:20,fontSize:20,height:36,position:'absolute',color:'#4A4C4B'}}>
              {rowData.original_title}
            </a>
            <a style={{flex: 1,marginTop:70,marginLeft:20,fontSize:18,height:36,position:'absolute',color:'orange'}}>
              {rowData.rating.average}
            </a>
          </div>
        )}
        useZscroller={true}
       scrollerOptions={{ scrollbars: true }}
       refreshControl={<ListView.RefreshControl
         refreshing={this.state.refreshing}
         onRefresh={this.state.manual ? this.refreshing.bind(this) : this.onRefresh.bind(this)}
         resistance={1}
       />}
      />
    );
  }
};

ReactDOM.render(<App/>, document.getElementById('content'));
