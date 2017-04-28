import React from 'react';
import {Route} from 'react-router';

import App from './containers/App';
import AppEnterLogin from './containers/AppEnterLogin';
import AppEnterWithoutLogin from './containers/AppEnterWithoutLogin';

import JobList from './containers/job/List';

import Login from './containers/account/Login';
import Signup from './containers/account/Signup';

import NotFoundPage from './components/notFoundPage/NotFoundPage';
import HelloPage from './components/notFoundPage/Hello';

export default function getRoutes() {
  return (
    <Route component={App}>
      {/*这里的AppEnter是为了在这之下的route中都做一次登录判断*/}
      <Route component={AppEnterLogin}>
        <Route path="/job" component={JobList}/>
      </Route>

      <Route component={AppEnterWithoutLogin}>
        <Route path="/" component={HelloPage}/>
        <Route path="/account/login" component={Login}/>
        <Route path="/account/signup" component={Signup}/>

        <Route path="404" component={NotFoundPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Route>
  );
}
