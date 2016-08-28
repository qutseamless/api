/**
 * @module manages the task fo generating esdocs. (basically thin cmd wrapper).
 */
import { run } from '../libs';


/**
 * manages tasks of: regenerating docs.
 */
run('esdoc', [
  '-c',
  `${__dirname}/esdocs.json`,
]);
