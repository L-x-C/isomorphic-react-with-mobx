// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console */
import webpack from 'webpack';
import {getProdConfigs} from '../webpack/webpack.config';
import 'colors';
import { argv as args } from 'yargs';
import async from 'async';

const webpackConfigs = getProdConfigs();

const callback = (err, stats, config) => {
  const inSilentMode = args.s; // set to true when -s is passed on the command

  if (!inSilentMode) {
    console.log('Generating minified bundle for production use via Webpack...'.bold.blue);
  }

  if (err) { // so a fatal error occurred. Stop here.
    console.log(err.bold.red);

    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings && !inSilentMode) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  if (!inSilentMode) {
    console.log(`Webpack stats: ${stats}`.green);
  }

  // if we got this far, the build succeeded.
  console.log(`Your app has been compiled in production mode for entry ${Object.keys(config.entry)} and written to ${config.output.path}. It\'s ready to roll!`.green.bold);

  return 0;
};

async.eachSeries(webpackConfigs, function(config, callback) {
  webpack(config).run((err, stats) => {
    callback(err, stats, config);
  });
});