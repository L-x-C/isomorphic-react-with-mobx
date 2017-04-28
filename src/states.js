import {observable, toJS} from 'mobx';
import mergeObservables from './helpers/mergeObservables';
import menuState from './states/menu';
import jobState from './states/job';
import peopleState from './states/people';
import companyState from './states/company';
import accountState from './states/account';

const defaultState = observable({
  menu: menuState,
  job: jobState,
  company: companyState,
  account: accountState,
  people: peopleState
});

export const createServerState = () => toJS(defaultState);

export const createClientState = () => mergeObservables(defaultState, window.__INITIAL_STATE__);

