import React from 'react';
import Carousel from '../components/carousel/Carousel';
import '../css/carousel.css'

export default class myCarousel extends React.Component {
  constructor(props) {
    super(props);
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
