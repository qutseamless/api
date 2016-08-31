import { run } from '../libs';

run('docker', [
  'build',
  '--name', 'qutseamless/api',
  '--port', '3000:3000',
  '-f', `${__dirname}/Dockerfile`, '.',
])
.then(() => run('docker', ['push', 'qutseamless/api']));

// run('docker-compose', [
//   '-f', `${__dirname}/docker-compose.yml`,
//   'build',
// ]);
