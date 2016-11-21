import React from 'react';
import Carousel from 'react-mobile-carousel';

export default class myCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    this.context.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave
    )
  }
  routerWillLeave() {
    console.log("离开轮播");
  }
  handleItemClick(index,href,event) {
    console.log(href);
  }
  render() {
    let data = [
      {
        "src":"http://dcloud.io/hellomui/images/muwu.jpg",
        "id":'6',
        "url":"http://localhost:8080/#/button"
      },
      {
        "src":"http://dcloud.io/hellomui/images/shuijiao.jpg",
        "url":"https://www.baidu.com"
      },
      {
        "src":"http://dcloud.io/hellomui/images/cbd.jpg",
        "id":"4",
        "url":"http://localhost:8080/#/button"
      }
    ];
    return (
      <Carousel data={data} autoplay link='[url]/[id]'/>
    );
  }
};

myCarousel.contextTypes = {
    router: Object
};
