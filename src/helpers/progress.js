import Nprogress from 'nprogress';

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

function isClient() {
  return !!((typeof window !== 'undefined') && window.document);
}