import React, {Component, PropTypes} from 'react';
import {action} from 'mobx';
import {progress} from '../../helpers/progress';


export default class TestPage extends Component {
  @action
  static onEnter({states, query, params}) {
    progress();
  }

  render() {
    return (
      <div>
        <h1>testPage2</h1>
      </div>
    );
  }
}


TestPage.propTypes = {
  student: PropTypes.object
};
