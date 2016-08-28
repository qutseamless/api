import { run } from '../libs';

run('npm', ['run', 'build'])
.then(() =>
  run('docker-compose', [
    '-f', `${__dirname}/docker-compose.yml`,
    'up', '-d', '--build',
  ])
);
