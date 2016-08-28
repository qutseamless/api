import router from 'koa-router';

/** the methods to attach */
import { create, read, update, del } from './methods';


/** @type {string} endpoint the endpoint's name. */
const endpoint = 'data';

/** @type {Object} data manages CRUD for shipment records */
const data = router();

/** prefix the router with the endpoint name */
data.prefix(`/${endpoint}`);

/** attach methods to endpoint. */
data
  .post('/', create)
  .get('/', read)
  .put('/', update)
  .delete('/', del);

/** the default export (the endpoint). */
export default data;
