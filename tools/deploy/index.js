import { run } from '../libs';

run('docker', [
  'build',
  '-t', 'qutseamless/api',
  '-f', `${__dirname}/Dockerfile`, '.',
])
.then(() => run('docker', ['push', 'qutseamless/api']));

// run('docker-compose', [
//   '-f', `${__dirname}/docker-compose.yml`,
//   'build',
// ]);
