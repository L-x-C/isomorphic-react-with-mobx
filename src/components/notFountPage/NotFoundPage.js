import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './notFountPage.scss';
import image500 from '../../images/500.png';
import image400 from '../../images/404.png';

export default class NotFoundPage extends Component {
  getImg() {
    if (this.props.params.splat === '500') {
      return <img src={image500} alt="" />;
    } else {
      return <img src={image400} alt="" />;
    }
  }
  render() {
    return (
      <div>
        <Link to="/" className="qbt-notFound">
          {this.getImg()}
        </Link>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  type: PropTypes.string,
  params: PropTypes.object
};
