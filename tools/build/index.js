/**
 * @module manages the task of building the app. for extensibility it can also
 * accept a argument to specify build directory (used by the dev server daemon).
 */
import { clean, copy, run } from '../libs';


/**
 * @type {String} [directory='build'] directory the build directory.
 */
const directory = process.argv[2] || 'build';


/**
 * performs tasks of: clean directory, copy static assets, rebuild modules.
 */
clean(directory)
  .then(() => copy('source/assets/**', directory, { srcBase: 'source' }))
  .then(() => run('babel', ['source', '-q', '-d', directory]))
  .catch(console.log);
