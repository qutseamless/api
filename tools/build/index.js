/**
 * @module manages the task of building the app.
 */
const { clean, dir, copy, run } = require('../libs');


/**
 * @type {String} [directory='build'] directory the build directory.
 */
const directory = process.argv[2] || 'build';


/**
 * performs tasks of: clean directory, copy static assets, rebuild modules.
 */
clean(directory)
.then(() => dir('build'))
// .then(() => copy('source/assets', directory))
.then(() => run('babel', ['source', '-q', '-d', directory]))
.catch(console.log);
