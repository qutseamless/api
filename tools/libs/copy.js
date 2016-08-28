/**
 * @module promisifies the npm copy module, and parses all the default args.
 */
import cp from 'copy';


/**
 * coppies glob paths to new directory.
 *
 * @param  {String|Array} globs the glob patters to copy from.
 * @param  {String} newDir the directory to copy the files to.
 * @param  {type} options the copy modules options arg (see npm copy).
 * @returns {Promise} returns promise of task completion.
 */
export function copy(globs, newDir, options) {
  return new Promise(resolve => cp(globs, newDir, options, resolve));
}

export default copy;

/*
eslint
import/no-extraneous-dependencies: 0,
*/
