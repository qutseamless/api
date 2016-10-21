/**
 * @module runs tests.
 */
const { run } = require('../libs');


/**
 * clean up .nyc_output
 */


/**
 *  run ava with nyc and watch.
 */
run('ava', ['source/**/spec.js', '-w'])
.catch(console.log);