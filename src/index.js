import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import Root from './containers/Root';
import getRoutes from './routes';
import './styles/main.scss';
import {createClientState} from './states';
import async from 'async';
import {progressStart, progressDone} from './helpers/progress';

let states = createClientState();

let ignoreFirstLoad = true;
function onRouterUpdate() {
  if (ignoreFirstLoad && window.__INITIAL_STATE__) {
    ignoreFirstLoad = false;
    return;
  }
  // Page changed, executing onEnter
  let params = this.state.params;
  let query = this.state.location.query;
  let pathname = this.state.location.pathname.slice(1);
  async.eachSeries(this.state.components.filter(c => c.onEnter), function(c, callback) {
    let enterFn = c.onEnter({states, query, params, pathname});
    if (enterFn) {
      enterFn.then(res => {
        progressDone();
        if (res) {
          //处理Promise回调执行，比如登陆
          res.forEach((fn) => {
            if (Object.prototype.toString.call(fn) === '[object Function]') {
              fn();
            }
          });
        }

        callback();
      });
    } else {
      callback();
    }
  });
}

render(<Root states={states} onUpdate={onRouterUpdate} history={browserHistory}
             routes={getRoutes()}/>, document.getElementById('app'));
