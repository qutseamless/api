import 'babel-polyfill';


import parser from 'koa-bodyparser';
import logger from 'koa-logger';
import Koa from 'koa';

import endpoints from './endpoints';


/**
 * @type {Koa} app the pure koa instance
 */
const app = new Koa();


/** setup core middleware */
app
  .use(logger())
  .use(parser())
  .use(endpoints.routes())
  .use(endpoints.allowedMethods());


export default app;
