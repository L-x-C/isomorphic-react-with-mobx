import {observable, toJS} from 'mobx';
import mergeObservables from './helpers/mergeObservables';
import menuState from './states/menu';
import jobState from './states/job';
import accountState from './states/account';

const defaultState = observable({
  menu: menuState,
  job: jobState,
  account: accountState
});

export const createServerState = () => toJS(defaultState);

export const createClientState = () => mergeObservables(defaultState, window.__INITIAL_STATE__);

