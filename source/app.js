import parser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa-cors';
import Koa from 'koa';

import api from './api';

/**
 * @type {Koa} app the pure koa instance
 */
const app = new Koa();


if (process.env.NODE_ENV !== 'production') {
  app.use(logger())
}

const options = {
  origin: 'http://localhost:8080',
};

if (process.env.NODE_ENV === 'production') {
  options.origin = 'http://http://52.63.159.167';
}


app
.use(parser())
.use(cors(options))
.use(api.routes())
.use(api.allowedMethods());


export default app;
