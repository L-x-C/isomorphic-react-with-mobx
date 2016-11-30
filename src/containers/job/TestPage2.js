import React, {Component, PropTypes} from 'react';
import {action} from 'mobx';
import StudentActions from '../../actions/student';
import { Link } from 'react-router';

export default class TestPage extends Component {
  render() {
    return (
      <div>
        <Link to="/test">link to test1</Link>
        <h1>testPage2</h1>
      </div>
    );
  }
}


TestPage.propTypes = {
  student: PropTypes.object
};
