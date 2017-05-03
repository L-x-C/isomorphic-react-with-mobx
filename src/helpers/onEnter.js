import async from 'async';

export default (renderProps, states) => {
  const params = renderProps.params;
  const query = renderProps.location.query;
  const pathname = renderProps.location.pathname;

  let onEnterArr = renderProps.components.filter(c => c.onEnter);
  return new Promise((resolve, reject) => {
    async.eachOfSeries(onEnterArr, function(c, key, callback) {
      let enterFn = c.onEnter({states, query, params, pathname});
      if (enterFn) {
        enterFn.then(res => {
          if (res) {
            //处理Promise回调执行，比如登陆
            res.forEach((fn) => {
              if (Object.prototype.toString.call(fn) === '[object Function]') {
                fn();
              }
            });
          }

          if (key === (onEnterArr.length - 1)) {
            resolve();
          }

          callback();
        }).catch(err => {
          reject(err);
        });
      } else {
        callback();
      }
    });
  });
};
