import React, { Component, PropTypes } from 'react';
import './notFountPage.scss';
import imageHello from '../../images/hello.gif';
import MenuHeader from '../menuHeader/MenuHeader';

export default class Hello extends Component {
  render() {
    return (
      <div>
        <MenuHeader hello="true" />
        <div className="qbt-notFound qbt-notFount_hello">
          <img src={imageHello} alt="" />
        </div>
      </div>
    );
  }
}

Hello.propTypes = {
  type: PropTypes.string,
  params: PropTypes.object
};
