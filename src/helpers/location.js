import {CV_SERVER, UP_API_SERVER, STATIC_PREFIX} from '../../config.json';
import isEmpty from 'lodash/isEmpty';
import {isClient} from './utils';
import {browserHistory} from 'react-router';

export class RedirectException {
  constructor(location, options) {
    this.location = location;
    this.options = options;
  }
}

// status code is ignored when redirect from client side
export function redirect(url, options) {
  if (isClient()) {
    const {back, history} = options || {};
    if (history) {
      //如果有这个字段，就直接单页面路由跳转
      let finalUrl = back ? appendParam(url, {return: (typeof back === 'string') ? back : window.location.pathname}) : url;
      browserHistory.push(finalUrl);
    } else {
      window.location.href = back ? appendParam(url, {return: (typeof back === 'string') ? back : window.location.href}) : url;
    }
  }
  else {
    if (options.history) {
      //如果有这个字段，说明是站内，加url前缀
      throw new RedirectException(STATIC_PREFIX + url, options);
    } else {
      throw new RedirectException(url, options);
    }
  }
}

export function appendParam(url, params) {
  const pairs = [];
  for (let name in params) {
    pairs.push(`${name}=${encodeURIComponent(params[name])}`);
  }

  if (isEmpty(pairs)) {
    return url;
  }

  let result = url;
  if (!url.endsWith('?')) {
    result += url.includes('?') ? '&' : '?';
  }
  result += pairs.join('&');
  return result;
}

export function login() {
  redirect(`/account/login`, {history: true, back: true});
}
