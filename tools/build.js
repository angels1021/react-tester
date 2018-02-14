/* eslint-disable no-console */
import colors from 'colors';
import webpack from 'webpack';
import config from '../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via webpack. this will take a moment'.blue);

webpack(config).run((err, stats) => {
  if (err) { //stop here in case of fatal error
    console.log('error'.red, err.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.err.forEach(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log('webpack generated the following warnings: '.bold.yellow);
    return jsonStats.warnings.forEach(warning => console.log(warning.yellow));
  }

  console.log('Webpack stats:', stats);

  //if we got this far, build succeeded.
  console.log('Ypur app has been compiled in production mode and written to /dist. it\'s ready to roll'.green);

  return 1;
});
