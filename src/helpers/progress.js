import Nprogress from 'nprogress';
import {isClient} from './utils';

export function progressStart() {
  if (isClient()) {
    Nprogress.start();
  }
}

export function progressDone() {
  if (isClient()) {
    Nprogress.done();
  }
}

export function progress() {
  progressStart();
  progressDone();
}
