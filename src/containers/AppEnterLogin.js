import React, {PropTypes, Component} from 'react';
import {action} from 'mobx';
import menuActions from '../actions/menu';

export default class AppEnterLogin extends Component {
  @action
  static onEnter({states, pathname, query, params}) {
    return Promise.all([
      menuActions.fetchUsers(states, true)
    ]);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

AppEnterLogin.propTypes = {
  children: PropTypes.element
};
