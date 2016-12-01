import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Root from './containers/Root';
import getRoutes from './routes';
import './styles/main.scss';
import {createClientState} from './states';

let states = createClientState();

let ignoreFirstLoad = true;
function onRouterUpdate() {
  if (ignoreFirstLoad && window.__INITIAL_STATE__) {
    ignoreFirstLoad = false;
    return;
  }

  // Page changed, executing fetchData
  let params = this.state.params;
  let query = this.state.location.query;
  this.state.components.filter(c => c.fetchData).forEach(c => {
    c.fetchData({states, params, query});
  });
}

render(<Root states={states} onUpdate={onRouterUpdate} history={browserHistory}
             routes={getRoutes()}/>, document.getElementById('app'));
