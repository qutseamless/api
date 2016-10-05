import router from 'koa-router';
import verify from '../oauth/verify';
import {
  me,
  create,
  read,
  update,
  del,
} from './methods';


/**
 * @type {Router} user router
 */
const user = router();


user
.get('/me', verify, me)

.post('/', verify, create)
.get('/', verify, read)
.put('/', verify, update)
.delete('/', verify, del);


/**
 * @type {Router} user.
 */
export default user;
