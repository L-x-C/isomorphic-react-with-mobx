import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './menu.scss';

export default class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <Link to="/test2" className="menu-link" activeClassName="active">test2</Link>
        <Link to="/test" className="menu-link" activeClassName="active">test1</Link>
      </div>
    );
  }
}

Menu.propTypes = {
  type: PropTypes.string,
  params: PropTypes.object
};
