import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default function getPlugins(env, isServerRender) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === 'development'
  };
  const plugins = [
    //Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('/styles.[contenthash].css'),
    require('autoprefixer')
  ];

  if (isServerRender) {
    return plugins;
  }

  switch (env) {
    case 'production':
      plugins.push(new webpack.optimize.UglifyJsPlugin());
      plugins.push(new AssetsPlugin({
        path: path.join(__dirname, '..', 'dist'),
        filename: 'assets.json',
        fullPath: false
      }));
      plugins.push(new webpack.optimize.CommonsChunkPlugin({
        names: [ "manifest", "vendor"],
        minChunks: function(module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
          )
        }
      }));
      plugins.push(new WebpackMd5Hash());
      plugins.push(new webpack.optimize.ModuleConcatenationPlugin());

      break;

    case 'development':
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoEmitOnErrorsPlugin());
      break;
  }

  return plugins;
}
