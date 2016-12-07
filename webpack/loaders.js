import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function getLoaders(env) {
  return [{
    test: /\.jsx?$/,
    loaders: ['babel', 'eslint'],
    include: path.join(__dirname, '..', 'src'),
    exclude: path.join('node_modules')
  }, {
    test: /\.(jpe?g|png|gif|woff|svg|eot|ttf)\??.*$/,
    loader: 'url-loader?limit=10000&name=[path][name].[hash].[ext]'
  }, {
    test: /\.json$/,
    loaders: ['json']
  }, {
    test: /(\.css|\.scss)$/,
    loader: env === 'production' ?
      ExtractTextPlugin.extract("css?sourceMap!postcss!sass?sourceMap") : 'style!css!postcss!sass?sourceMap',
    exclude: path.join('node_modules')
  }];
}
