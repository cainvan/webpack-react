// use jsx to render html, do not modify simple.html

import './assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from './src/index.js';

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: '相约酒店',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: '麦当劳邀您过周末',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: '食惠周',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
let index = data.length - 1;

let pageIndex = 0;

const App = React.createClass({
  getInitialState() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.initData = [];
    for (let i = 0; i < 20; i++) {
      this.initData.push(`r${i}`);
    }
    return {
      dataSource: dataSource.cloneWithRows(this.initData),
      refreshing: false,
      manual: false,
    };
  },
  onRefresh() {
    console.log('onRefresh');
    this.setState({ refreshing: true });
    this.onAjax();
  },
  onAjax() {
    setTimeout(() => {
      this.initData = [`ref${pageIndex++}`, ...this.initData];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.initData),
        refreshing: false,
      });
    }, 1000);
  },
  onManual() {
    this.setState({
      manual: true,
    });
    console.log('onManual');
    this.setState({ refreshing: true });
  },
  onScroll() {
    console.log('sss');
  },
  render() {
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }} />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID}
          style={{
            padding: '8px 16px',
            backgroundColor: 'white',
          }}
        >
          <h3 style={{
            padding: 2,
            marginBottom: 8,
            borderBottom: '1px solid #F6F6F6',
          }}>{obj.title}</h3>
          <div style={{ display: '-webkit-box', display: 'flex' }}>
            <img style={{ height: 64 * (window.viewportScale || 1), marginRight: 8 }} src={obj.img} />
            <div style={{ display: 'inline-block' }}>
              <p>{obj.des}-{rowData}</p>
              <p><span style={{ fontSize: '1.6em', color: '#FF6E27' }}>35</span>元/任务</p>
            </div>
          </div>
        </div>
      );
    };
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderHeader={() => <div>
          <button onClick={this.onManual}>点击刷新</button>
          <button onClick={() => this.setState({ manual: false })}>手动刷新</button>
        </div>}
        renderRow={row}
        renderSeparator={separator}
        initialListSize={5}
        pageSize={5}
        scrollRenderAheadDistance={200}
        scrollEventThrottle={20}
        onScroll={this.onScroll}
        style={{
          height: 400,
          border: '1px solid #ddd',
          margin: '10px 0',
        }}
        useZscroller
        scrollerOptions={{ scrollbars: true }}
        refreshControl={<ListView.RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.state.manual ? this.onAjax : this.onRefresh}
          resistance={1}
        />}
      />
    );
  },
});

ReactDOM.render(<App />, document.getElementById('content'));
