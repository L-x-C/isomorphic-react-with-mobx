const {isObservableArray, isObservableMap} = require('mobx');
import {observable, toJS} from 'mobx';

/**
 * Helper function that supports merging maps
 * @param target
 * @param source
 */
function mergeObservables(target, source) {
  if (!source) {
    return target;
  } else {
    Object.keys(target).forEach(key => {
      if (typeof target[key] === 'object') {
        if (isObservableMap(target[key])) return target[key].merge(source[key]);
        if (isObservableArray(target[key])) return target[key].replace(source[key]);
        target[key] = source[key];
      } else {
        target[key] = source[key];
      }
    });

    return window.__INITIAL_STATE__ = target;
  }
}

module.exports = mergeObservables;
