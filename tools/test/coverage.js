/**
 * @module runs a mocha test suite with nyc (previously istanbul api),
 * and performs a post cleanup.
 */
import { run, clean } from '../libs';


/**
 * performs the task of: run nyc/mocha, cleans up test coverage files.
 */
run('nyc', [
  'mocha',
  'source/**/spec.js',
  '--opts',
  `${__dirname}/mocha.opts`,
])
.then(() => clean('.nyc_output'))
.catch(console.log);

/*
eslint
import/no-extraneous-dependencies: 0,
no-shadow: 0,
*/
