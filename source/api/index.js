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
.use('/shipments', shipment.routes())
.use('/shipments', shipment.allowedMethods())
.use('/packets', packet.routes())
.use('/packets', packet.allowedMethods())
.use('/users', user.routes())
.use('/users', user.allowedMethods());


export default endpoints;
