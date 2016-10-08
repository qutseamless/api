import router from 'koa-router';
import verify from '../oauth/verify';
import {
  create,
  read,
} from './methods';


/**
 * @type {Router} packet router
 */
const packet = router();


packet
.post('/', create)
.get('/', verify, read);


/**
 * @type {Router} packet.
 */
export default packet;
