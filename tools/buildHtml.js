/* eslint-disable no-console */
import colors from 'colors';
import fs from 'fs';
import cheerio from 'cheerio';

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if (err) {
    return console.log('error'.red, err.red);
  }

  const $ = cheerio.load(markup);

  //add css for production
  $('head').prepend('<link rel="stylesheet" href="styles.css" />');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (ex) => {
    if (ex) {
      return console.log('error'.red, ex.red);
    }
    return console.log('index.html successfully written to /dist folder'.green);
  });

  return 0;

});