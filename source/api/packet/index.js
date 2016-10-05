import router from 'koa-router';
import {
  create,
  read,
  update,
  del,
} from './methods';


/**
 * @type {Router} packet router
 */
const packet = router();


packet
.post('/', create)
.get('/', read)
.put('/', update)
.delete('/', del);


/**
 * @type {Router} packet.
 */
export default packet;
