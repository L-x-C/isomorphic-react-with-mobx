import React from 'react';
import {Route} from 'react-router';

import App from './containers/App';
import TestPage from './containers/job/TestPage';
import TestPage2 from './containers/job/TestPage2';
import NotFoundPage from './components/notFountPage/NotFoundPage';

export default function getRoutes() {
  return (
    <Route component={App}>
      <Route path="test" component={TestPage}/>
      <Route path="test2" component={TestPage2}/>
      <Route path="404" component={NotFoundPage}/>
      <Route path="*" component={NotFoundPage}/>
    </Route>
  );
}
