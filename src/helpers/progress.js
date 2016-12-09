import Nprogress from 'nprogress';
import {isClient} from './utils';

export function progressStart() {
  if (isClient()) {
    require('nprogress/nprogress.css');
    Nprogress.start();
  }
}

export function progressDone() {
  if (isClient()) {
    require('nprogress/nprogress.css');
    Nprogress.done();
  }
}

export function progress() {
  progressStart();
  progressDone();
}
