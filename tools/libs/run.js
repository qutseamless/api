/**
 * @module promisifies nodes child_process.spawn module. this is different from
 * nodes child_process.exec in two ways:
 *  - you have the option to set stdio to pipe.
 *  - it returns a promise.
 */
import { spawn } from 'child_process';


/**
 * runs a command and pipes output to stdio. resolves with a promise.
 * @param  {String} command - the command to run (throws on invalid).
 * @param  {Array} args - an array of arguments to feed into the command.
 * @returns {Promise} returns a promise resolved on task completion
 */
export function run(command, args) {
  return new Promise(resolve => {
    const task = spawn(command, args, { stdio: 'inherit' });
    task.on('close', resolve);
  }
  );
}

export default run;
