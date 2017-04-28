import {action, toJS} from 'mobx';
import {message} from 'antd';
import fetch from 'isomorphic-fetch';
import {progressStart, progressDone} from '../helpers/progress';
import {UP_API_SERVER, WWW_SERVER} from '../../config.json';
import {isClient, getFetchObj} from '../helpers/utils';
import {browserHistory} from 'react-router';
import qs from 'qs';

export default {
  @action sendCodeMsg(obj) {
    //发送验证码信息
  },

  //创建账号
  @action createAccount(obj) {
    message.success('注册成功');
    browserHistory.push('/company');
  },

  //登录
  @action login(obj) {
    message.success('登录成功');
    let history = qs.parse(window.location.search.substring(1)).return || '/';
    browserHistory.push(history);
  },

  //登出
  @action logout() {
    message.success('大爷再来玩儿啊~');
    browserHistory.push('/');
  }
};
