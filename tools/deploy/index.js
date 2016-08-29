import { run } from '../libs';

run('npm', ['run', 'build'])
.then(() =>
  run('docker-compose', [
    '-f', `${__dirname}/docker-compose.yml`,
    'build',
  ])
)
.then(() =>
  run('docker', ['push', 'seamless/api'])
);
