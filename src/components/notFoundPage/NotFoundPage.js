import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import './notFountPage.scss';
import image404 from '../../images/404.gif';
import image500 from '../../images/500.jpg';

export default class NotFoundPage extends Component {
  getImg() {
    if (this.props.params.splat === '500') {
      return <img src={image500} alt="" />;
    } else {
      return <img src={image404} alt="" />;
    }
  }
  render() {
    return (
      <div>
        <Link to="/" className={this.props.params.splat === '500' ? 'qbt-notFound qbt-notFount_500' : 'qbt-notFound'}>
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
