import {action, toJS} from 'mobx';
import {message} from 'antd';
import fetch from 'isomorphic-fetch';
import {progressStart, progressDone} from '../helpers/progress';
import {redirect} from '../helpers/location';
import {UP_API_SERVER} from '../../config.json';
import qs from 'qs';
import {isClient, getFetchObj} from '../helpers/utils';
import {browserHistory} from 'react-router';

export default {
  @action fetchJobList(states, obj) {
    states.job.jobList.datas = [{
      id: '1',
      name: '小白',
      age: 18,
      address: '地球路111号'
    }, {
      id: '2',
      name: '小黑',
      age: 22,
      address: '宇宙区银河路222号'
    }];
  },

  @action addList(states, obj) {
    return new Promise((resolve) => {
      obj.id = Math.random();
      states.jobList.datas.push(obj);

      resolve();
    });
  }
};
