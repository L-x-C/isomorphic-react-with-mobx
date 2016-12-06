import React, {Component, PropTypes} from 'react';
import {action} from 'mobx';
import studentActions from '../../actions/student';
import menuActions from '../../actions/menu';
import {observer, inject} from 'mobx-react';

@inject("student")
@observer
export default class TestPage extends Component {
  @action
  static onEnter({states, query, params}) {
    return Promise.all([
      menuActions.changeMenuTitle(states, 'serverTitle'),
      studentActions.fetchName(states),
      studentActions.fetchName2(states)
    ]).then(values => {
      //do something
    });
  }

  changeName = () => {
    this.props.student.store_name = 'ClientName';
  };

  render() {
    return (
      <div>
        <h1>{this.props.student.store_name}</h1>
        <button onClick={this.changeName}>click to change name</button>
      </div>
    );
  }
}


TestPage.propTypes = {
  student: PropTypes.object
};
