import {action} from 'mobx';
import fetch from 'isomorphic-fetch';

export default {
  fetchName: action(function(states) {
    return new Promise((resolve)=> {
      setTimeout(function() {
        states.student.store_name = 'SeverName';
        resolve(1);
      }, 1000);
    });
  }),
  
  fetchName2: action(function(states) {
    return new Promise((resolve)=> {
      setTimeout(function() {
        states.student.store_name = 'SeverName2';
        resolve(2);
      }, 1500);
    });
  })
};
