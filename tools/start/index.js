/**
 * this module is used for developing and runs the webpac dev server, connected
 * to webpack dashboard.
 */
const { run } = require('../libs');


/**
 * - builds project
 * - runs dev server with dashboard.
 */
run('npm', ['run', 'build'])
.then(() => {
  run('nodemon', ['build/main.js']);
  run('watch', [
    'npm run build',
    'source',
  ]);
});
