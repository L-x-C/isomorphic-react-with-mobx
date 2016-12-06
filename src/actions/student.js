import {action} from 'mobx';
import fetch from 'isomorphic-fetch';
import {login} from '../helpers/location';

export default {
  @action fetchName: function(states) {
    return new Promise((resolve)=> {
      setTimeout(function() {
        states.student.store_name = 'SeverName after 1s';
        resolve();
      }, 1000);
    });
  },

  @action fetchName2: function(states) {
    return new Promise((resolve)=> {
      setTimeout(function() {
        states.student.store_name = 'SeverName2 after 1.5s';
        resolve();
      }, 1500);
    });
  }
};
