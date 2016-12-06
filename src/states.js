import {observable, toJS} from 'mobx';
import mergeObservables from './helpers/mergeObservables';
import studentState from './states/students';
import menuState from './states/menu';

const defaultState = observable({
  student: studentState,
  menu: menuState
});

export const createServerState = () => toJS(defaultState);

export const createClientState = () => mergeObservables(defaultState, window.__INITIAL_STATE__);

