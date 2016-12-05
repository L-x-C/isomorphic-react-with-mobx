import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './menu.scss';

export default class Menu extends Component {
  render() {
    return (
      <div className="menu">
        <Link to="/test2" className="menu-link" activeClassName="active">page2</Link>
        <Link to="/test" className="menu-link" activeClassName="active">page1</Link>
      </div>
    );
  }
}

Menu.propTypes = {
  type: PropTypes.string,
  params: PropTypes.object
};
