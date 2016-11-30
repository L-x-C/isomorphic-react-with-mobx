import {observable, toJS} from 'mobx';
import mergeObservables from './helpers/mergeObservables';
import studentState from './states/students';

const defaultState = observable({
  student: studentState
});

export const createServerState = () => toJS(defaultState);

export const createClientState = () => mergeObservables(defaultState, window.__INITIAL_STATE__);

