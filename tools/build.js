// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfigBuilder from '../webpack/webpack.config';
import 'colors';
import { argv as args } from 'yargs';

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

const isServer = args.server;

const webpackConfig = webpackConfigBuilder(process.env.NODE_ENV, isServer);

webpack(webpackConfig).run((err, stats) => {
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
  console.log(`Your app has been compiled in production mode for ${isServer ? 'server' : 'client'} and written to /dist. It\'s ready to roll!`.green.bold);

  return 0;
});
