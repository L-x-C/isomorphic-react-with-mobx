import {action} from 'mobx';
import fetch from 'isomorphic-fetch';

export default {
  fetchName: action(function(states) {
    // fetch('http://job.qiaobutang.com/job/5429.json', {
    //   credentials: 'include'
    // }).then((res) => {
    //   return res.json();
    // }).then(function(data) {
    //   console.log(state)
    //   state.student.store_name = data.result.applyCount;
    //   resolve()
    // });
    return new Promise((resolve)=> {
      setTimeout(function() {
        states.student.store_name = 'SeverName';
        resolve();
      }, 1000);
    });
  })
};
