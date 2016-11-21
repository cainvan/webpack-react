import React from "react";
import {Link} from "react-router";
import $ from "jquery";
import style from "../css/listView.css";
import iScroll from "iscroll/build/iscroll-probe"; // 只有这个库支持onScroll,从而支持bounce阶段的事件捕捉
import LazyLoad from 'react-lazyload';

export default class MsgListPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
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

        const options = {
          // 默认iscroll会拦截元素的默认事件处理函数，我们需要响应onClick，因此要配置
          preventDefault: false,
          // 禁止缩放
          zoom: false,
          // 支持鼠标事件，因为我开发是PC鼠标模拟的
          mouseWheel: true,
          // 滚动事件的探测灵敏度，1-3，越高越灵敏，兼容性越好，性能越差
          probeType: 3,
          // 拖拽超过上下界后出现弹射动画效果，用于实现下拉/上拉刷新
          bounce: true,
          // 展示滚动条
          scrollbars: true,

        };
        this.iScrollInstance = new iScroll(`#${style.ListOutsite}`, options);
        this.iScrollInstance.on('scroll', this.onScroll);
        this.iScrollInstance.on('scrollEnd', this.onScrollEnd);

        this.fetchItems(true);
    }

    fetchItems(isRefresh) {
        if (isRefresh) {
            this.page = 1;
        }
        $.ajax({
            url: '/app/data/movie.json',
            data: {page: this.page},
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                if (isRefresh) {    // 刷新操作
                    if (this.state.pullDownStatus == 3) {
                        this.setState({
                            pullDownStatus: 4,
                            items: response.subjects
                        });
                        this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 500);
                    }
                } else {    // 加载操作
                    if (this.state.pullUpStatus == 2) {
                        this.setState({
                            pullUpStatus: 0,
                            items: this.state.items.concat(response.subjects)
                        });
                    }
                }
                ++this.page;
                console.log(`fetchItems=effected isRefresh=${isRefresh}`);
            }
        });
    }

    /**
     * 点击跳转详情页
     */
    onItemClicked(ev) {
        // 获取对应的DOM节点, 转换成jquery对象
        let item = $(ev.target);
        // 操作router实现页面切换
        this.context.router.push(item.attr('to'));
        this.context.router.goForward();
    }

    onTouchStart(ev) {
        this.isTouching = true;
    }

    onTouchEnd(ev) {
        this.isTouching = false;
    }

    onPullDown() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y > 5) {
                this.state.pullDownStatus != 2 && this.setState({pullDownStatus: 2});
            } else {
                this.state.pullDownStatus != 1 && this.setState({pullDownStatus: 1});
            }
        }
    }

    onPullUp() {
        // 手势
        if (this.isTouching) {
            if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY - 5) {
                this.state.pullUpStatus != 1 && this.setState({pullUpStatus: 1});
            } else {
                this.state.pullUpStatus != 0 && this.setState({pullUpStatus: 0});
            }
        }
    }

    onScroll() {
        let pullDown = $(this.refs.PullDown);

        // 上拉区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            this.onPullDown();
        } else {
            this.state.pullDownStatus != 0 && this.setState({pullDownStatus: 0});
        }

        // 下拉区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY + 5) {
            this.onPullUp();
        }
    }

    onScrollEnd() {
        console.log("onScrollEnd" + this.state.pullDownStatus);

        let pullDown = $(this.refs.PullDown);

        // 滑动结束后，停在刷新区域
        if (this.iScrollInstance.y > -1 * pullDown.height()) {
            if (this.state.pullDownStatus <= 1) {   // 没有发起刷新,那么弹回去
                this.iScrollInstance.scrollTo(0, -1 * $(this.refs.PullDown).height(), 200);
            } else if (this.state.pullDownStatus == 2) { // 发起了刷新,那么更新状态
                this.setState({pullDownStatus: 3});
                this.fetchItems(true);
            }
        }

        // 滑动结束后，停在加载区域
        if (this.iScrollInstance.y <= this.iScrollInstance.maxScrollY) {
            if (this.state.pullUpStatus == 1) { // 发起了加载，那么更新状态
                this.setState({pullUpStatus: 2});
                this.fetchItems(false);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 列表发生了变化, 那么应该在componentDidUpdate时调用iscroll进行refresh
        this.itemsChanged = nextState.items !== this.state.items;
        return true;
    }

    componentDidUpdate() {
        // 仅当列表发生了变更，才调用iscroll的refresh重新计算滚动条信息
        if (this.itemsChanged) {
            this.iScrollInstance.refresh();
        }
        return true;
    }

    render() {
        let lis = [];

        this.state.items.forEach((rowData, index) => {
            lis.push(
              <LazyLoad key={index} height={120} overflow>

                <div key={index} >
                  <img src={rowData.images.medium}/>
                  <a id={style.FirstA}>
                    {rowData.original_title}
                  </a>
                  <a id={style.SecondA}>
                    {rowData.rating.average}
                  </a>
                </div>
              </LazyLoad>

            );
        })

        // 外层容器要固定高度，才能使用滚动条
        return (
            <div id={style.ScrollContainer}>
                <div id={style.ListOutsite} style={{height: window.innerHeight}}
                     onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}>
                    <ul id={style.ListInside}>
                        <p ref="PullDown" id={style.PullDown}>{this.pullDownTips[this.state.pullDownStatus]}</p>
                        {lis}
                        <p ref="PullUp" id={style.PullUp}>{this.pullUpTips[this.state.pullUpStatus]}</p>
                    </ul>
                </div>
            </div>
        );
    }
}

MsgListPage.contextTypes = {
    router: () => { React.PropTypes.object.isRequired }
};
