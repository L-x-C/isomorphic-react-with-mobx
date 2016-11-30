import path from 'path';
import autoprefixer from 'autoprefixer';
import getLoaders from './loaders';
import getPlugins from './plugins';
import nodeExternals from 'webpack-node-externals';
const config = require('../config.json');

const getEntry = function (env, isServer) {
  const entry = ['babel-polyfill'];
  if (isServer) {
    entry.push('./src/serverRender.js');
  } else {
    if (env === 'development') { // only want hot reloading when in dev.
      entry.push('webpack-hot-middleware/client?reload=true');
    }
    entry.push('./src/index.js');
  }
  return entry;
};

function getOutput(env, isServer) {
  const output = {
    path: path.join(__dirname, '..', '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: env === 'production' ? `${config.STATIC_PREFIX}/` : '/'
  };
  if (isServer) {
    output.filename = 'serverRender.js';
    output.libraryTarget = 'commonjs2';
  } else {
    output.filename = env === 'production' ? '/bundle.[hash].js' : 'bundle.js';
  }
  return output;
}

export default function getConfig(env, isServer) {
  const config = {
    debug: true,
    devtool: env === 'production' ? 'source-map' : 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, // set to false to see a list of every file being bundled.
    entry: getEntry(env, isServer),
    target: isServer ? 'node' : 'web',
    output: getOutput(env, isServer),
    plugins: getPlugins(env, isServer),
    module: {
      loaders: getLoaders(env)
    },
    postcss: [autoprefixer()]
  };
  if (isServer) {
    config.externals = [nodeExternals()];
  }
  return config;
}
