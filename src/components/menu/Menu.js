import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './menu.scss';
import {observer, inject} from 'mobx-react';

@inject("menu")
@observer
export default class Menu extends Component {
  render() {
    return (
      <div>
        <p>titleName：{this.props.menu.title}</p>

        <div className="menu">
          <Link to="/test2" className="menu-link" activeClassName="active">
            <i className="iconfont icon-locationfill"></i>
            page2
          </Link>
          <Link to="/test" className="menu-link" activeClassName="active">
            <i className="iconfont icon-locationfill"></i>
            page1
          </Link>
        </div>
      </div>

    );
  }
}

Menu.propTypes = {
  menu: PropTypes.object
};
