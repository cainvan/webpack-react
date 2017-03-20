import React from 'react';
import Carousel from '../components/carousel/Carousel';
import '../css/carousel.css'

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
  render() {
    return (
      <Carousel className="slider" autoplay>
        <div><img src="http://dcloud.io/hellomui/images/muwu.jpg"/></div>
        <div><img src="http://dcloud.io/hellomui/images/shuijiao.jpg"/></div>
        <div><img src="http://dcloud.io/hellomui/images/cbd.jpg"/></div>
      </Carousel>
    );
  }
};

myCarousel.contextTypes = {
    router: Object
};
