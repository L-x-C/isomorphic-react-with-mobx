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
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    }, {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }];
  }
};
