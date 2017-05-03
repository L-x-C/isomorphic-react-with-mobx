import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {observer, inject} from 'mobx-react';
import {Row, Col, Menu, Button, Dropdown} from 'antd';
import accountActions from '../../actions/account';
import './menuHeader.scss';
import {isClient} from '../../helpers/utils';
import LogoPic from '../../images/logo.jpg';

@inject("menu")
@observer
export default class MenuHeader extends Component {
  render() {
    const accountMenu = (
      <Menu className="menu-account">
        <Menu.Item>
          <Link to="/account/edit">修改密码</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <p onClick={accountActions.logout}>登出</p>
        </Menu.Item>
      </Menu>
    );
    if (this.props.menu.pathname || this.props.hello) {
      return (
        <Row className="up-header">
          <div className="up-header__content">
            <Col span={3} offset={2} className="up-header__title_wrapper">
              <Link className="up-header__logo_wrapper" to="/">
                <div className="stack up-header__logo">
                  <div className="stack__figure">
                    <img className="up-logo" src={LogoPic} alt=""/>
                  </div>
                </div>
              </Link>
            </Col>
            <Col span={13} offset={1}>
              <Menu className="up-header__menu" mode="horizontal" selectedKeys={[this.props.menu.pathname]}>
                <Menu.Item key="job">
                  <Link to="/job">列表</Link>
                </Menu.Item>
                <Menu.Item key="company">
                  <Link to="/company">某页</Link>
                </Menu.Item>
              </Menu>
            </Col>

            {this.props.menu.name &&
            <Col span={4} className="up-header__name">
              <Dropdown overlay={accountMenu}>
                <p>{this.props.menu.name}</p>
              </Dropdown>
            </Col>}
            {!this.props.menu.name &&
            <Col span={4} className="up-header__login_wrapper">
              <Link to="/account/login">登录</Link>
              <Link to="/account/signup">注册</Link>
            </Col>}
          </div>
        </Row>
      );
    } else {
      return null;
    }
  }
}

MenuHeader.propTypes = {
  menu: PropTypes.object,
  hello: PropTypes.string
};
