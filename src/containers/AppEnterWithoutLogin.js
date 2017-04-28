import React, {PropTypes, Component} from 'react';
import {action} from 'mobx';
import menuActions from '../actions/menu';

export default class AppEnterWithoutLogin extends Component {
  @action
  static onEnter({states, pathname, query, params}) {
    return Promise.all([
      menuActions.fetchUsers(states)
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

AppEnterWithoutLogin.propTypes = {
  children: PropTypes.element
};
