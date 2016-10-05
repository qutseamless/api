import router from 'koa-router';
import verify from '../oauth/verify';
import {
  del,
} from './methods';


/**
 * @type {Router} user router
 */
const business = router();


business
.delete('/', verify, del);


/**
 * @type {Router} user.
 */
export default business;
