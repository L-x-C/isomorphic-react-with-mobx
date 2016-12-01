import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';

export default function getPlugins(env, isServer) {
  const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify(env),
    __DEV__: env === 'development'
  };
  const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    //Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('/styles.[contenthash].css')
  ];

  if (isServer) {
    return plugins;
  }

  switch (env) {
  case 'production':
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }));
    plugins.push(new AssetsPlugin({
      path: path.join(__dirname, '..', 'dist'),
      filename: 'assets.json',
      fullPath: false
    }));
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',      // 需要注意的是，chunk的name不能相同！！！
        minChunks: 2
    }));
    break;

  case 'development':
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NoErrorsPlugin());
    break;
  }

  return plugins;
}
