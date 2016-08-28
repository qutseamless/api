/**
 * @module a glob deletion modules. accepts a list of arguments and feeds them
 * into an array before running the array with the del module, and returning
 * a promise
 */
import del from 'del';


/**
 * deletes all directories/files matching the glob patterns.
 * @param  {Array<String>} ...args an array of glob patterns.
 * @returns {Promise} returns a promise of task completion
 */
export function clean(...globs) {
  return del(globs);
}

export default clean;

/*
eslint
import/no-extraneous-dependencies: 0,
*/
