import path from 'path';
import autoprefixer from 'autoprefixer';
import getLoaders from './loaders';
import getPlugins from './plugins';
import nodeExternals from 'webpack-node-externals';
import {STATIC_PREFIX} from '../config.json';

function getBaseConfig(env) {
  return {
    debug: true,
    devtool: env === 'production' ? 'source-map' : 'cheap-module-eval-source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
    noInfo: true, // set to false to see a list of every file being bundled.
    target: 'web',
    plugins: getPlugins(env, false),
    module: {
      loaders: getLoaders(env)
    },
    postcss: [autoprefixer()]
  };
}

export function getDevConfig() {
  return Object.assign({}, getBaseConfig('development'), {
    entry: {
      index: ['babel-polyfill', 'webpack-hot-middleware/client?reload=true', './src/index.js']
    },
    output: {
      path: "/", // NO real path is required, just pass "/"
      filename: '[name].js',
      publicPath: '/'
    }
  });
}

export function getProdConfigs() {
  const env = 'production';
  const config = Object.assign({}, getBaseConfig(env), {
    entry: {
      index: ['babel-polyfill', './src/index.js']
    },
    output: {
      path: path.join(__dirname, '..', '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
      filename: '/[name].[chunkhash].js',
      chunkFilename: "[chunkhash].js",
      publicPath: `${STATIC_PREFIX}/`
    }
  });

  return [
    config,
    Object.assign({}, config, {
      entry: {
        serverRender: ['babel-polyfill', './src/serverRender.js']
      },
      output: Object.assign({}, config.output, {
        filename: '[name].js',
        libraryTarget: 'commonjs2'
      }),
      plugins: getPlugins(env, true),
      target: 'node',
      externals: [nodeExternals()]
    })
  ];
}
