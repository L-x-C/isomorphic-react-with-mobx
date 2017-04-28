import {action, toJS} from 'mobx';
import fetch from 'isomorphic-fetch';
import {UP_API_SERVER} from '../../config.json';
import {redirect, login} from '../helpers/location';

export default {
  @action fetchUsers: function(states, needLogin) {
    return new Promise((resolve) => {
      resolve();
    });
  },

  @action setTDK(states, t, d, k) {
    t && (states.menu.tdk.title = t);
    d && (states.menu.tdk.description = d);
    k && (states.menu.tdk.keywords = k);
  }
};
