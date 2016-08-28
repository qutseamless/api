import mongoose from 'mongoose';
import app from './app';

/** assign es6 promises to mongoose promises */
mongoose.Promise = Promise;


/**
 * @type {Number} port the application port.
 * @type {String} db the db address.
 * @type {String} name the db name.
 */
const port = process.argv[2] || 3000;
const db = process.argv[3] || 'localhost';
const name = process.argv[4] || 'test';


/**
 * @type {Koa} server the koa application.
 */
let server;


/**
 * starts the koa instance
 */
function start() {
  console.log(`api is connected to port: ${port}.`);
  server = app.listen(port);
}


/**
 * gracefully stops the koa instance (if started).
 */
function stop() {
  if (server) {
    console.log('api is disconnected');
    server.close();
  }
}


/**
 * register stop on SIGINT
 */
process.on('SIGINT', stop);


/**
 * connect to db, then start app.
 */
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', start);

mongoose.connect(`mongodb://${db}/${name}`);
