/**
 * @module manages the tasks of: building, starting, stopping,
 * rebuilding, and restarting of an app (daemon).
 */
import { spawn } from 'child_process';
import { watch } from 'chokidar';
import { run, clean } from '../libs';


/**
 * @type {Process} app - the application process to manage.
 * @type {String} watchDir - the directory to watch.
 * @type {String} tmpDir - the tmp directory for the app.
 * @type {Watch} watcher - a chokidar watch instance.
 * @type {Boolean} mutex.locked - the mutext for watch actions.
 */
let app;
const watchDir = 'source';
const tmpDir = 'tools/dev/temp';
const watcher = watch(watchDir);
const mutex = {
  locked: true,
};


/**
 * process cleanup. tasks include: kill app, close watcher, clean temp dir.
 */
process.on('SIGINT',
  () => {
    app.kill('SIGINT');
    watcher.close();
    clean(tmpDir);
  }
);


/**
 * refreshes the tmp server (as long as mutex is unlocked). tasks include:
 * lock mutex, kill app (if running), rebuild tmp app, respawn app,
 * and finally unlock mutex.
 */
async function refresh() {
  if (mutex.locked) return;
  mutex.locked = true;

  if (app) app.kill('SIGINT');
  try {
    await run('npm', ['run', 'build', '--', tmpDir]);
    app = spawn('node', [`${tmpDir}/main`], { stdio: 'inherit' });
  } catch (error) {
    throw error;
  }
  mutex.locked = false;
}


/**
 * assign listeners to the watcher.
 */
watcher
  .on('add', refresh)
  .on('change', refresh)
  .on('unlink', refresh)
  .on('addDir', refresh)
  .on('unlinkDir', refresh)
  .on('error', console.log)
  .on('ready', () => {
    mutex.locked = false;
    refresh();
  });


/*
eslint
import/no-extraneous-dependencies: 0,
*/
