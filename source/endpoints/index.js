/**
 * This is the main router for the application and all endpoints will be
 * appended here.
 */
import router from 'koa-router';


/**
 * the endpoints to attach
 */
import data from './data';


/**
 * @type {Router} endpoints the router for all endpoints
 */
const endpoints = router();


/** attach middleware and endpoints */
endpoints
  .use(data.routes())
  .use(data.allowedMethods());


/**
 * export the router as the default
 */
export default endpoints;
