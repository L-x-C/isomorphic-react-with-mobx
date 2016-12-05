import React, {Component, PropTypes} from 'react';
import {action} from 'mobx';
import StudentActions from '../../actions/student';
import { Link } from 'react-router';
import Menu from '../../components/menu/Menu';

export default class TestPage extends Component {
  render() {
    return (
      <div>
        <Menu />
        <h1>testPage2</h1>
      </div>
    );
  }
}


TestPage.propTypes = {
  student: PropTypes.object
};
