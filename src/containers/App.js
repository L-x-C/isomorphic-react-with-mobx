import React, {PropTypes, Component} from 'react';
import MenuHeader from '../components/menuHeader/MenuHeader';
import {action} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Row, Col} from "antd";
import Helmet from "react-helmet";
import menuActions from '../actions/menu';

@inject("menu")
@observer
export default class App extends Component {
  @action
  static onEnter({states, pathname, query, params}) {
    let refinePathname = pathname.startsWith('/') ? pathname.substring(1) : pathname; //因为客户端渲染和服务端渲染的pathname不同，会多一个/
    refinePathname = refinePathname.split('/')[0];  //这个项目为了能让比如/job/new,/job/1都进入一个tab，所以做了这个处理
    states.menu.pathname = refinePathname;

    return Promise.all([
      menuActions.setTDK(states, 'L-x-C', 'a demo', 'lol')
    ]);
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.menu.tdk.title}
                meta={[
                  {"name": "keywords", "content": `${this.props.menu.tdk.keywords}`},
                  {"name": "description", "content": `${this.props.menu.tdk.description}`}
                ]}/>

        <MenuHeader />
        <div className="app-content">
          {this.props.children}
        </div>


        <Row className="admin-footer" type="flex" justify="center" align="middle">
          <Col span={12} className="admin-footer__content">( ◕‿‿◕ )</Col>
        </Row>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  menu: PropTypes.object
};
