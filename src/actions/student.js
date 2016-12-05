import {action} from 'mobx';
import fetch from 'isomorphic-fetch';

export default {
  @action fetchName: function(states) {
    return new Promise((resolve)=> {
      setTimeout(function() {
        states.student.store_name = 'SeverName';
        resolve(1);
      }, 1000);
    });
  },

  @action fetchName2: function(states) {
    return new Promise((resolve)=> {
      setTimeout(function() {
        states.student.store_name = 'SeverName2';
        resolve(2);
      }, 1500);
    });
  }
};
