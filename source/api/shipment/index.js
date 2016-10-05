import router from 'koa-router';
import verify from '../oauth/verify';
import {
  create,
  read,
  update,
  del,
} from './methods';


/**
 * @type {Router} shipment router
 */
const shipment = router();


shipment
.post('/', verify,  create)
.get('/', verify, read)
.put('/', verify, update)
.delete('/', verify, del);


/**
 * @type {Router} shipment.
 */
export default shipment;
