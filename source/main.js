import mongoose from 'mongoose';
import app from './app';


/**
 * @type {Promise} mongoose.Promise using native promises.
 */
mongoose.Promise = Promise;


/**
 * @type {Number} port the application port.
 * @type {String} db the db address.
 * @type {String} name the db name.
 */
const port = process.argv[2] || 3000;
const db = process.argv[3] || 'localhost';
const name = process.argv[4] || 'seamless-test';


/**
 * @type {Koa} server the koa application.
 */
let server;


/**
 * start koa
 */
function start() {
  console.log(`api is connected to port: ${port}.`);
  server = app.listen(port);
}


/**
 * gracefully stop koa
 */
function stop() {
  if (server) {
    console.log('api is disconnected');
    server.close();
  }
}


/**
 * SIGINT runs stop
 */
process.on('SIGINT', stop);


/**
 * - connect to db
 * - start app.
 */
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', start);
mongoose.connect(`mongodb://${db}/${name}`);
