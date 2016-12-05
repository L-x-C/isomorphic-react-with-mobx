import React, {PropTypes, Component} from 'react';
import Menu from '../components/menu/Menu';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (
      <div>
        <Menu />
        {this.props.children}
      </div>
    );
  }
}
