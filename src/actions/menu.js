import {action} from 'mobx';

export default {
  @action changeMenuTitle: function(states, title) {
    return new Promise((resolve)=> {
      states.menu.title = title;
      resolve(1);
    });
  }
};
