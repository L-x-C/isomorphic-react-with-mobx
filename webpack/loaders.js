import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function getLoaders(env) {
  return [{
    test: /\.jsx?$/,
    use: ["babel-loader", "eslint-loader"],
    include: path.join(__dirname, '..', 'src'),
    exclude: path.join(__dirname, '../node_modules')
  }, {
    test: /\.(jpe?g|png|gif|woff|svg|eot|ttf)\??.*$/,
    loader: 'url-loader',
    options: {
      limit: 8192
    }
  }, {
    test: /(\.css|\.scss)$/,
    use: env === 'production' ?
      ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "postcss-loader", "sass-loader"]
      }) :
      ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    exclude: path.join(__dirname, '../node_modules')
  }];
}
