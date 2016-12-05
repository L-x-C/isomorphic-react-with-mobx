import React, {Component, PropTypes} from 'react';

export default class TestPage extends Component {
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
