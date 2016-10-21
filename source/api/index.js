/**
 * @type {Router} router of the server app.
 */
import router from 'koa-router';

import register from './register';
import sign from './oauth/sign';
import business from './business';
import shipment from './shipment';
import packet from './packet';
import user from './user';

/**
 * @type {Router} endpoints the router for all endpoints
 */
const endpoints = router({ prefix: '/api' });


endpoints
.post('/register', register)
.post('/oauth', sign)

.use('/business', business.routes())
.use('/business', business.allowedMethods())
.use('/shipment', shipment.routes())
.use('/shipment', shipment.allowedMethods())
.use('/packet', packet.routes())
.use('/packet', packet.allowedMethods())
.use('/user', user.routes())
.use('/user', user.allowedMethods());


export default endpoints;
