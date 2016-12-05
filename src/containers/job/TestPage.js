import React, {Component, PropTypes} from 'react';
import {action} from 'mobx';
import StudentActions from '../../actions/student';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import Menu from '../../components/menu/Menu';


@inject("student")
@observer
export default class TestPage extends Component {
  @action
  static onEnter({states, query, params}) {
    return Promise.all([
      StudentActions.fetchName(states),
      StudentActions.fetchName2(states)
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
        <Menu />
        <h1>{this.props.student.store_name}</h1>
        <button onClick={this.changeName}>click to change name</button>
      </div>
    );
  }
}


TestPage.propTypes = {
  student: PropTypes.object
};
